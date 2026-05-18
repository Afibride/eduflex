<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use App\Models\Grade;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

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
            'parent_phone' => 'required|string',
            'parent_email' => 'required|email',
            'class_id' => 'required|exists:classes,id',
        ]);

        $schoolId = $request->user()->school_id;
        $schoolCode = $request->user()->school->code;
        
        // Generate student number
        $studentNumber = $schoolCode . '-STD-' . str_pad(Student::where('school_id', $schoolId)->count() + 1, 4, '0', STR_PAD_LEFT);
        
        // Create user account
        $userId = $schoolCode . '-STUDENT-' . str_pad(User::where('school_id', $schoolId)->where('role', 'student')->count() + 1, 3, '0', STR_PAD_LEFT);
        
        $user = User::create([
            'school_id' => $schoolId,
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->parent_email,
            'phone' => $request->parent_phone,
            'user_id' => $userId,
            'role' => 'student',
            'password' => Hash::make(Str::random(10)),
            'is_active' => false,
        ]);
        
        // Create student profile
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
        
        return response()->json([
            'message' => 'Student created successfully',
            'student' => $student->load('user', 'studentClass'),
            'user_id' => $userId,
        ], 201);
    }

    public function show($id)
    {
        $student = Student::with('user', 'studentClass', 'grades.subject', 'attendances')
                    ->findOrFail($id);
        
        return response()->json($student);
    }

    public function getGrades($id)
    {
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
            'date_of_birth' => 'sometimes|date',
            'gender' => 'sometimes|in:male,female',
            'address' => 'nullable|string',
            'parent_phone' => 'nullable|string',
            'parent_email' => 'nullable|email',
            'class_id' => 'nullable|exists:classes,id',
            'status' => 'sometimes|in:active,graduated,transferred,suspended',
        ]);

        $student->update($data);
        $student->user->update([
            'name' => $student->full_name,
            'email' => $data['parent_email'] ?? $student->user->email,
            'phone' => $data['parent_phone'] ?? $student->user->phone,
        ]);

        return response()->json([
            'message' => 'Student updated successfully',
            'student' => $student->fresh(['user', 'studentClass']),
        ]);
    }

    public function destroy($id)
    {
        $student = Student::with('user')->findOrFail($id);
        $student->user?->delete();

        return response()->json(['message' => 'Student deleted successfully']);
    }
}
