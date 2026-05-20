<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use App\Models\Grade;
use App\Models\Attendance;
use App\Models\Classe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Throwable;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $schoolId = $request->user()->school_id;
        $students = Student::with('user', 'studentClass')
                    ->where('school_id', $schoolId)
                    ->paginate(20);
        
        return response()->json($students);
    }

    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'date_of_birth' => 'required|date',
            'gender' => 'required|in:male,female',
            'email' => 'required|email|unique:users,email',
            'parent_phone' => 'required|string',
            'parent_email' => 'required|email',
            'class_id' => 'required|exists:classes,id',
        ]);

        $schoolId = $request->user()->school_id;
        Classe::where('school_id', $schoolId)->findOrFail($request->class_id);
        $schoolCode = $request->user()->school->code;

        $studentNumber = $this->nextStudentNumber($schoolId, $schoolCode);
        $userId = $this->nextStudentUserId($schoolId, $schoolCode);

        $user = User::create([
            'school_id' => $schoolId,
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'phone' => $request->parent_phone,
            'user_id' => $userId,
            'role' => 'student',
            'password' => Hash::make(Str::random(16)),
            'is_active' => false,
        ]);

        try {
            $student = Student::create([
                'user_id' => $user->id,
                'school_id' => $schoolId,
                'class_id' => $request->class_id,
                'student_number' => $studentNumber,
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'date_of_birth' => $request->date_of_birth,
                'gender' => $request->gender,
                'parent_phone' => $request->parent_phone,
                'parent_email' => $request->parent_email,
                'enrollment_date' => now(),
            ]);
        } catch (Throwable $exception) {
            $user->delete();
            throw $exception;
        }
        
        return response()->json([
            'message' => 'Student created successfully',
            'student' => $student->load('user', 'studentClass'),
            'user_id' => $userId,
            'activation_code' => $userId,
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $student = Student::with('user', 'studentClass', 'grades.subject', 'attendances')
                    ->where('school_id', $request->user()->school_id)
                    ->findOrFail($id);
        
        return response()->json($student);
    }

    public function getGrades(Request $request, $id)
    {
        Student::where('school_id', $request->user()->school_id)->findOrFail($id);

        $grades = Grade::with('subject')
                    ->where('student_id', $id)
                    ->get()
                    ->groupBy('term');
        
        $averages = [];
        foreach ($grades as $term => $termGrades) {
            $averages[$term] = $termGrades->avg('percentage');
        }
        
        return response()->json([
            'grades' => $grades,
            'averages' => $averages,
        ]);
    }

    public function getAttendance($id, Request $request)
    {
        Student::where('school_id', $request->user()->school_id)->findOrFail($id);

        $month = $request->get('month', date('m'));
        $year = $request->get('year', date('Y'));
        
        $attendance = Attendance::where('student_id', $id)
                    ->whereYear('date', $year)
                    ->whereMonth('date', $month)
                    ->get();
        
        $summary = [
            'present' => $attendance->where('status', 'present')->count(),
            'absent' => $attendance->where('status', 'absent')->count(),
            'late' => $attendance->where('status', 'late')->count(),
            'excused' => $attendance->where('status', 'excused')->count(),
        ];
        
        return response()->json([
            'attendance' => $attendance,
            'summary' => $summary,
        ]);
    }

    public function update(Request $request, $id)
    {
        $student = Student::with('user')->findOrFail($id);
        $data = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $student->user_id,
            'date_of_birth' => 'sometimes|date',
            'gender' => 'sometimes|in:male,female',
            'address' => 'nullable|string',
            'parent_phone' => 'nullable|string',
            'parent_email' => 'nullable|email',
            'class_id' => 'nullable|exists:classes,id',
            'status' => 'sometimes|in:active,graduated,transferred,suspended',
        ]);

        abort_unless($student->school_id === $request->user()->school_id, 404);
        if (isset($data['class_id'])) {
            Classe::where('school_id', $request->user()->school_id)->findOrFail($data['class_id']);
        }

        $student->update($data);
        $student->user->update([
            'name' => $student->full_name,
            'email' => $data['email'] ?? $student->user->email,
            'phone' => $data['parent_phone'] ?? $student->user->phone,
        ]);

        return response()->json([
            'message' => 'Student updated successfully',
            'student' => $student->fresh(['user', 'studentClass']),
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $student = Student::with('user')
            ->where('school_id', $request->user()->school_id)
            ->findOrFail($id);
        $student->user?->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }

    public function activationCode(Request $request, $id)
    {
        $student = Student::with('user')
            ->where('school_id', $request->user()->school_id)
            ->findOrFail($id);

        return response()->json([
            'activation_code' => $student->user->user_id,
            'email' => $student->user->email,
            'is_active' => $student->user->is_active,
        ]);
    }

    private function nextStudentNumber(int $schoolId, string $schoolCode): string
    {
        $next = Student::where('school_id', $schoolId)->count() + 1;

        do {
            $code = $schoolCode . '-STD-' . str_pad($next, 4, '0', STR_PAD_LEFT);
            $next++;
        } while (Student::where('student_number', $code)->exists());

        return $code;
    }

    private function nextStudentUserId(int $schoolId, string $schoolCode): string
    {
        $next = User::where('school_id', $schoolId)->where('role', 'student')->count() + 1;

        do {
            $code = $schoolCode . '-STUDENT-' . str_pad($next, 3, '0', STR_PAD_LEFT);
            $next++;
        } while (User::where('user_id', $code)->exists());

        return $code;
    }
}
