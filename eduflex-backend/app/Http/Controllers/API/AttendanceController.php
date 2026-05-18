<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function index(Request $request)
    {
        $query = Attendance::with(['student.user', 'studentClass'])
            ->whereHas('student', fn ($q) => $q->where('school_id', $request->user()->school_id));

        if ($request->filled('class_id')) {
            $query->where('class_id', $request->class_id);
        }
        if ($request->filled('student_id')) {
            $query->where('student_id', $request->student_id);
        }
        if ($request->filled('date')) {
            $query->whereDate('date', $request->date);
        }

        return response()->json($query->latest('date')->paginate(100));
    }

    public function store(Request $request)
    {
        $rows = $request->input('records', [$request->all()]);
        $saved = [];

        foreach ($rows as $row) {
            validator($row, [
                'student_id' => 'required|exists:students,id',
                'class_id' => 'required|exists:classes,id',
                'date' => 'required|date',
                'status' => 'required|in:present,absent,late,excused',
                'remarks' => 'nullable|string',
            ])->validate();

            $saved[] = Attendance::updateOrCreate(
                ['student_id' => $row['student_id'], 'date' => $row['date']],
                [
                    'class_id' => $row['class_id'],
                    'status' => $row['status'],
                    'remarks' => $row['remarks'] ?? null,
                ]
            );
        }

        return response()->json(['message' => 'Attendance saved successfully', 'attendance' => $saved], 201);
    }

    public function update(Request $request, $id)
    {
        $attendance = Attendance::findOrFail($id);
        $data = $request->validate([
            'student_id' => 'sometimes|exists:students,id',
            'class_id' => 'sometimes|exists:classes,id',
            'date' => 'sometimes|date',
            'status' => 'sometimes|in:present,absent,late,excused',
            'remarks' => 'nullable|string',
        ]);

        $attendance->update($data);

        return response()->json(['message' => 'Attendance updated successfully', 'attendance' => $attendance->fresh(['student', 'studentClass'])]);
    }

    public function getClassAttendance($classId, $date)
    {
        return response()->json(
            Attendance::with('student.user')
                ->where('class_id', $classId)
                ->whereDate('date', $date)
                ->get()
        );
    }
}
