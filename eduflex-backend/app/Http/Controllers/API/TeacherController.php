<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $teachers = Teacher::with(['user', 'homeroomClasses'])
            ->where('school_id', $request->user()->school_id)
            ->paginate(20);

        return response()->json($teachers);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female',
            'qualification' => 'nullable|string|max:255',
            'subjects' => 'nullable|array',
            'hire_date' => 'nullable|date',
            'status' => 'nullable|in:active,on_leave,resigned',
        ]);

        $school = $request->user()->school;
        $teacherNumber = $school->code . '-TCH-' . str_pad(
            Teacher::where('school_id', $school->id)->count() + 1,
            4,
            '0',
            STR_PAD_LEFT
        );
        $userId = $school->code . '-TEACHER-' . str_pad(
            User::where('school_id', $school->id)->where('role', 'teacher')->count() + 1,
            3,
            '0',
            STR_PAD_LEFT
        );

        $teacher = DB::transaction(function () use ($data, $school, $userId, $teacherNumber) {
            $user = User::create([
                'school_id' => $school->id,
                'name' => $data['first_name'] . ' ' . $data['last_name'],
                'email' => $data['email'],
                'phone' => $data['phone'] ?? null,
                'user_id' => $userId,
                'role' => 'teacher',
                'password' => Hash::make(Str::random(16)),
                'is_active' => false,
            ]);

            return Teacher::create([
                'user_id' => $user->id,
                'school_id' => $school->id,
                'teacher_number' => $teacherNumber,
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'date_of_birth' => $data['date_of_birth'] ?? now()->subYears(25)->toDateString(),
                'gender' => $data['gender'],
                'qualification' => $data['qualification'] ?? 'Not specified',
                'subjects' => $data['subjects'] ?? [],
                'hire_date' => $data['hire_date'] ?? now()->toDateString(),
                'status' => $data['status'] ?? 'active',
            ]);
        });

        return response()->json([
            'message' => 'Teacher created successfully',
            'teacher' => $teacher->load('user'),
            'user_id' => $userId,
            'activation_code' => $userId,
        ], 201);
    }

    public function show(Request $request, $id)
    {
        return response()->json(
            Teacher::with(['user', 'homeroomClasses'])
                ->where('school_id', $request->user()->school_id)
                ->findOrFail($id)
        );
    }

    public function update(Request $request, $id)
    {
        $teacher = Teacher::with('user')
            ->where('school_id', $request->user()->school_id)
            ->findOrFail($id);
        $data = $request->validate([
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $teacher->user_id,
            'phone' => 'nullable|string',
            'date_of_birth' => 'sometimes|date',
            'gender' => 'sometimes|in:male,female',
            'qualification' => 'nullable|string|max:255',
            'subjects' => 'nullable|array',
            'hire_date' => 'sometimes|date',
            'status' => 'sometimes|in:active,on_leave,resigned',
        ]);

        $teacher->update($data);
        $teacher->user->update([
            'name' => $teacher->full_name,
            'email' => $data['email'] ?? $teacher->user->email,
            'phone' => $data['phone'] ?? $teacher->user->phone,
        ]);

        return response()->json(['message' => 'Teacher updated successfully', 'teacher' => $teacher->fresh('user')]);
    }

    public function destroy(Request $request, $id)
    {
        $teacher = Teacher::with('user')
            ->where('school_id', $request->user()->school_id)
            ->findOrFail($id);
        $teacher->user?->delete();

        return response()->json(['message' => 'Teacher deleted successfully']);
    }

    public function activationCode(Request $request, $id)
    {
        $teacher = Teacher::with('user')
            ->where('school_id', $request->user()->school_id)
            ->findOrFail($id);

        return response()->json([
            'activation_code' => $teacher->user->user_id,
            'email' => $teacher->user->email,
            'is_active' => $teacher->user->is_active,
        ]);
    }
}
