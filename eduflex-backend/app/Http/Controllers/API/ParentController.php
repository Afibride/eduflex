<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Parente;
use App\Models\User;
use App\Models\Student;
use App\Models\Attendance;
use App\Models\Grade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ParentController extends Controller
{
    /**
     * Display a listing of parents
     */
    public function index(Request $request)
    {
        $schoolId = $request->user()->school_id;
        
        $parents = Parente::with('user', 'students')
            ->where('school_id', $schoolId)
            ->paginate(20);

        return response()->json($parents);
    }

    /**
     * Store a newly created parent
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|unique:parents,phone',
            'email' => 'required|email|unique:parents,email|unique:users,email',
            'address' => 'nullable|string',
            'occupation' => 'nullable|string',
            'student_ids' => 'array',
            'student_ids.*' => 'exists:students,id',
            'relationships' => 'array',
            'relationships.*' => 'in:father,mother,guardian',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $schoolId = $request->user()->school_id;
        $schoolCode = $request->user()->school->code;

        if ($request->filled('student_ids')) {
            $validStudentCount = Student::where('school_id', $schoolId)
                ->whereIn('id', $request->student_ids)
                ->count();

            if ($validStudentCount !== count($request->student_ids)) {
                return response()->json(['error' => 'One or more students do not belong to your school'], 422);
            }
        }

        // Generate parent number
        $parentNumber = $schoolCode . '-PAR-' . str_pad(
            Parente::where('school_id', $schoolId)->count() + 1, 
            4, 
            '0', 
            STR_PAD_LEFT
        );

        // Generate user ID
        $userId = $schoolCode . '-PARENT-' . str_pad(
            User::where('school_id', $schoolId)->where('role', 'parent')->count() + 1, 
            3, 
            '0', 
            STR_PAD_LEFT
        );

        $parent = DB::transaction(function () use ($request, $schoolId, $userId, $parentNumber) {
            $user = User::create([
                'school_id' => $schoolId,
                'name' => $request->first_name . ' ' . $request->last_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'user_id' => $userId,
                'role' => 'parent',
                'password' => Hash::make(Str::random(16)),
                'is_active' => false,
            ]);

            $parent = Parente::create([
                'user_id' => $user->id,
                'school_id' => $schoolId,
                'parent_number' => $parentNumber,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
                'occupation' => $request->occupation,
            ]);

            if ($request->has('student_ids')) {
                foreach ($request->student_ids as $index => $studentId) {
                    $relationship = $request->relationships[$index] ?? 'guardian';
                    $parent->students()->attach($studentId, ['relationship' => $relationship]);
                }
            }

            return $parent;
        });

        return response()->json([
            'message' => 'Parent created successfully',
            'parent' => $parent->load('user', 'students'),
            'user_id' => $userId,
            'activation_code' => $userId,
            'temporary_password' => 'Will be sent via email'
        ], 201);
    }

    /**
     * Display the specified parent
     */
    public function show(Request $request, $id)
    {
        $parent = Parente::with('user', 'students', 'students.studentClass', 'students.grades')
            ->where('school_id', $request->user()->school_id)
            ->findOrFail($id);

        return response()->json($parent);
    }

    /**
     * Update the specified parent
     */
    public function update(Request $request, $id)
    {
        $parent = Parente::where('school_id', $request->user()->school_id)->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|unique:parents,phone,' . $id,
            'email' => 'sometimes|email|unique:parents,email,' . $id . '|unique:users,email,' . $parent->user_id,
            'address' => 'nullable|string',
            'occupation' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $parent->update($request->only([
            'first_name', 'last_name', 'phone', 'email', 'address', 'occupation'
        ]));

        // Update associated user
        $parent->user->update([
            'name' => $parent->full_name,
            'email' => $parent->email,
            'phone' => $parent->phone,
        ]);

        return response()->json([
            'message' => 'Parent updated successfully',
            'parent' => $parent->load('user', 'students')
        ]);
    }

    /**
     * Remove the specified parent
     */
    public function destroy(Request $request, $id)
    {
        $parent = Parente::where('school_id', $request->user()->school_id)->findOrFail($id);
        
        // Detach all students
        $parent->students()->detach();
        
        // Delete user account
        $parent->user->delete();
        
        // Delete parent profile
        $parent->delete();

        return response()->json([
            'message' => 'Parent deleted successfully'
        ]);
    }

    /**
     * Get all children of a parent
     */
    public function getChildren(Request $request, $id)
    {
        $parent = Parente::where('school_id', $request->user()->school_id)->findOrFail($id);
        
        $children = $parent->students()
            ->with(['studentClass', 'attendances' => function ($q) {
                $q->whereMonth('date', now()->month);
            }, 'grades' => function ($q) {
                $q->where('academic_year', now()->year);
            }])
            ->get();

        // Add statistics for each child
        foreach ($children as $child) {
            $child->attendance_summary = [
                'present' => $child->attendances->where('status', 'present')->count(),
                'absent' => $child->attendances->where('status', 'absent')->count(),
                'late' => $child->attendances->where('status', 'late')->count(),
            ];
            
            $child->average_grade = $child->grades->avg('percentage');
        }

        return response()->json($children);
    }

    /**
     * Link a student to parent
     */
    public function linkStudent(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'student_id' => 'required|exists:students,id',
            'relationship' => 'required|in:father,mother,guardian',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $parent = Parente::findOrFail($id);
        abort_unless($parent->school_id === $request->user()->school_id, 404);
        Student::where('school_id', $request->user()->school_id)->findOrFail($request->student_id);
        
        // Check if already linked
        if ($parent->hasStudent($request->student_id)) {
            return response()->json(['error' => 'Student already linked to this parent'], 400);
        }

        $parent->students()->attach($request->student_id, [
            'relationship' => $request->relationship
        ]);

        return response()->json([
            'message' => 'Student linked successfully',
            'parent' => $parent->load('students')
        ]);
    }

    /**
     * Unlink a student from parent
     */
    public function unlinkStudent(Request $request, $id, $studentId)
    {
        $parent = Parente::where('school_id', $request->user()->school_id)->findOrFail($id);
        Student::where('school_id', $request->user()->school_id)->findOrFail($studentId);
        
        if (!$parent->hasStudent($studentId)) {
            return response()->json(['error' => 'Student not linked to this parent'], 404);
        }

        $parent->students()->detach($studentId);

        return response()->json([
            'message' => 'Student unlinked successfully'
        ]);
    }

    /**
     * Get parent dashboard data
     */
    public function dashboard(Request $request)
    {
        $user = $request->user();
        $parent = Parente::where('user_id', $user->id)->firstOrFail();
        
        $children = $parent->students()->with(['studentClass', 'user'])->get();
        
        $dashboard = [
            'total_children' => $children->count(),
            'children' => [],
            'recent_activities' => [],
            'notifications' => [],
        ];

        foreach ($children as $child) {
            // Get recent grades (last 30 days)
            $recentGrades = Grade::where('student_id', $child->id)
                ->with('subject')
                ->where('created_at', '>=', now()->subDays(30))
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->get();

            // Get recent attendance
            $recentAttendance = Attendance::where('student_id', $child->id)
                ->where('date', '>=', now()->subDays(7))
                ->orderBy('date', 'desc')
                ->get();

            $dashboard['children'][] = [
                'id' => $child->id,
                'name' => $child->full_name,
                'student_number' => $child->student_number,
                'class' => $child->studentClass ? $child->studentClass->full_name : null,
                'average_grade' => Grade::where('student_id', $child->id)
                    ->where('academic_year', now()->year)
                    ->avg('percentage'),
                'recent_grades' => $recentGrades,
                'recent_attendance' => $recentAttendance,
                'relationship' => $parent->getRelationshipWithStudent($child->id),
            ];
        }

        return response()->json($dashboard);
    }

    /**
     * Get parent profile with complete information
     */
    public function profile(Request $request)
    {
        $user = $request->user();
        $parent = Parente::where('user_id', $user->id)
            ->with(['school', 'students' => function ($q) {
                $q->with(['studentClass', 'grades' => function ($g) {
                    $g->with('subject')->where('academic_year', now()->year);
                }]);
            }])
            ->firstOrFail();

        return response()->json([
            'user' => $user,
            'profile' => $parent,
        ]);
    }

    public function activationCode(Request $request, $id)
    {
        $parent = Parente::with('user')
            ->where('school_id', $request->user()->school_id)
            ->findOrFail($id);

        return response()->json([
            'activation_code' => $parent->user->user_id,
            'email' => $parent->user->email,
            'is_active' => $parent->user->is_active,
        ]);
    }
}
