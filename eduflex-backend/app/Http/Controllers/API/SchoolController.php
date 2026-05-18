<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Classe;
use App\Models\Announcement;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    public function index()
    {
        $schools = School::where('status', 'active')->get();
        return response()->json($schools);
    }

    public function show($id)
    {
        $school = School::with(['users', 'classes'])
            ->when(is_numeric($id), fn ($query) => $query->where('id', $id), fn ($query) => $query->where('code', $id))
            ->firstOrFail();
        
        // Get counts
        $studentCount = Student::where('school_id', $school->id)->count();
        $teacherCount = Teacher::where('school_id', $school->id)->count();
        $classCount = Classe::where('school_id', $school->id)->count();
        
        return response()->json([
            'school' => $school,
            'stats' => [
                'students' => $studentCount,
                'teachers' => $teacherCount,
                'classes' => $classCount,
            ]
        ]);
    }

    public function announcements($id)
    {
        $school = School::where('status', 'active')
            ->where(function ($query) use ($id) {
                if (is_numeric($id)) {
                    $query->where('id', $id);
                } else {
                    $query->where('code', $id);
                }
            })
            ->firstOrFail();

        return response()->json(
            Announcement::with('author:id,name')
                ->where('school_id', $school->id)
                ->where('status', 'active')
                ->where(function ($query) {
                    $query->whereNull('expires_at')->orWhereDate('expires_at', '>=', now()->toDateString());
                })
                ->orderByDesc('is_pinned')
                ->latest('published_at')
                ->paginate(10)
        );
    }

    public function myAnnouncements(Request $request)
    {
        return response()->json(
            Announcement::with('author:id,name')
                ->where('school_id', $request->user()->school_id)
                ->where('status', 'active')
                ->whereIn('audience', ['all', $request->user()->role, $request->user()->role . 's', $request->user()->role === 'teacher' ? 'staff' : 'all'])
                ->where(function ($query) {
                    $query->whereNull('expires_at')->orWhereDate('expires_at', '>=', now()->toDateString());
                })
                ->orderByDesc('is_pinned')
                ->latest('published_at')
                ->paginate(20)
        );
    }

    public function getDashboardStats(Request $request)
    {
        $schoolId = $request->user()->school_id;
        
        $stats = [
            'total_students' => Student::where('school_id', $schoolId)->count(),
            'total_teachers' => Teacher::where('school_id', $schoolId)->count(),
            'total_classes' => Classe::where('school_id', $schoolId)->count(),
            'active_students' => Student::where('school_id', $schoolId)->where('status', 'active')->count(),
        ];
        
        return response()->json($stats);
    }

    public function adminIndex(Request $request)
    {
        $schools = School::withCount(['students', 'teachers', 'classes'])
            ->where('id', $request->user()->school_id)
            ->when($request->filled('search'), function ($query) use ($request) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('code', 'like', "%{$search}%")
                        ->orWhere('principal_name', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate((int) $request->get('per_page', 20));

        return response()->json($schools);
    }

    public function profile(Request $request)
    {
        return response()->json(
            School::withCount(['students', 'teachers', 'classes'])
                ->findOrFail($request->user()->school_id)
        );
    }

    public function updateProfile(Request $request)
    {
        $school = School::findOrFail($request->user()->school_id);
        $data = $request->validate($this->schoolRules($school->id, true));

        $school->update($data);

        return response()->json([
            'message' => 'School profile updated successfully',
            'school' => $school->fresh(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->schoolRules());
        $data['status'] = $data['status'] ?? 'active';

        $school = School::create($data);

        return response()->json([
            'message' => 'School created successfully',
            'school' => $school,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $school = School::findOrFail($id);
        $data = $request->validate($this->schoolRules($school->id, true));
        $school->update($data);

        return response()->json([
            'message' => 'School updated successfully',
            'school' => $school->fresh(),
        ]);
    }

    public function destroy($id)
    {
        $school = School::findOrFail($id);
        $school->update(['status' => 'inactive']);

        return response()->json(['message' => 'School deactivated successfully']);
    }

    private function schoolRules(?int $ignoreId = null, bool $partial = false): array
    {
        $required = $partial ? 'sometimes' : 'required';
        $uniqueCode = 'unique:schools,code' . ($ignoreId ? ',' . $ignoreId : '');
        $uniqueEmail = 'unique:schools,email' . ($ignoreId ? ',' . $ignoreId : '');

        return [
            'name' => [$required, 'string', 'max:255'],
            'code' => [$required, 'string', 'max:50', $uniqueCode],
            'email' => [$required, 'email', 'max:255', $uniqueEmail],
            'phone' => ['nullable', 'string', 'max:50'],
            'address' => ['nullable', 'string'],
            'city' => ['nullable', 'string', 'max:100'],
            'region' => ['nullable', 'string', 'max:100'],
            'principal_name' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'curriculum' => ['nullable', 'array'],
            'logo' => ['nullable', 'string'],
            'color' => ['nullable', 'string', 'max:50'],
            'status' => ['sometimes', 'in:active,inactive,pending'],
        ];
    }
}
