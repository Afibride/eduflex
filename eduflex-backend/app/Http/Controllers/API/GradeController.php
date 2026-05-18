<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use Illuminate\Http\Request;

class GradeController extends Controller
{
    public function index(Request $request)
    {
        $query = Grade::with(['student.user', 'subject', 'studentClass'])
            ->whereHas('student', fn ($q) => $q->where('school_id', $request->user()->school_id));

        if ($request->filled('student_id')) {
            $query->where('student_id', $request->student_id);
        }
        if ($request->filled('class_id')) {
            $query->where('class_id', $request->class_id);
        }
        if ($request->filled('term')) {
            $query->where('term', $request->term);
        }

        return response()->json($query->latest()->paginate(50));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_id' => 'required|exists:subjects,id',
            'class_id' => 'required|exists:classes,id',
            'term' => 'required|string|max:50',
            'academic_year' => 'required|string|max:20',
            'score' => 'required|numeric|min:0',
            'max_score' => 'nullable|numeric|min:1',
            'grade' => 'nullable|string|max:10',
            'remarks' => 'nullable|string',
        ]);

        $grade = Grade::create($data + ['max_score' => $data['max_score'] ?? 100]);

        return response()->json(['message' => 'Grade created successfully', 'grade' => $grade->load(['student', 'subject'])], 201);
    }

    public function update(Request $request, $id)
    {
        $grade = Grade::findOrFail($id);
        $data = $request->validate([
            'student_id' => 'sometimes|exists:students,id',
            'subject_id' => 'sometimes|exists:subjects,id',
            'class_id' => 'sometimes|exists:classes,id',
            'term' => 'sometimes|string|max:50',
            'academic_year' => 'sometimes|string|max:20',
            'score' => 'sometimes|numeric|min:0',
            'max_score' => 'nullable|numeric|min:1',
            'grade' => 'nullable|string|max:10',
            'remarks' => 'nullable|string',
        ]);

        $grade->update($data);

        return response()->json(['message' => 'Grade updated successfully', 'grade' => $grade->fresh(['student', 'subject'])]);
    }

    public function destroy($id)
    {
        Grade::findOrFail($id)->delete();

        return response()->json(['message' => 'Grade deleted successfully']);
    }

    public function getClassGrades($classId, $term)
    {
        return response()->json(
            Grade::with(['student.user', 'subject'])
                ->where('class_id', $classId)
                ->where('term', $term)
                ->get()
                ->groupBy('student_id')
        );
    }
}
