<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use App\Models\Grade;
use App\Models\Student;
use App\Models\Subject;
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

        $data['max_score'] = $data['max_score'] ?? 100;
        Student::where('school_id', $request->user()->school_id)->findOrFail($data['student_id']);
        Classe::where('school_id', $request->user()->school_id)->findOrFail($data['class_id']);
        Subject::where('school_id', $request->user()->school_id)->findOrFail($data['subject_id']);

        $data['submitted_by'] = $request->user()->id;
        $data['verification_status'] = $request->user()->role === 'admin' ? 'verified' : 'pending';
        if ($data['verification_status'] === 'verified') {
            $data['verified_by'] = $request->user()->id;
            $data['verified_at'] = now();
        }

        $grade = Grade::create($data);

        return response()->json(['message' => 'Grade created successfully', 'grade' => $grade->load(['student', 'subject'])], 201);
    }

    public function update(Request $request, $id)
    {
        $grade = Grade::whereHas('student', fn ($q) => $q->where('school_id', $request->user()->school_id))
            ->findOrFail($id);
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
            'verification_status' => 'sometimes|in:pending,verified,rejected',
        ]);

        if (isset($data['student_id'])) {
            Student::where('school_id', $request->user()->school_id)->findOrFail($data['student_id']);
        }
        if (isset($data['class_id'])) {
            Classe::where('school_id', $request->user()->school_id)->findOrFail($data['class_id']);
        }
        if (isset($data['subject_id'])) {
            Subject::where('school_id', $request->user()->school_id)->findOrFail($data['subject_id']);
        }

        if (isset($data['verification_status']) && $data['verification_status'] === 'verified') {
            $data['verified_by'] = $request->user()->id;
            $data['verified_at'] = now();
            $data['rejection_reason'] = null;
        }

        $grade->update($data);

        return response()->json(['message' => 'Grade updated successfully', 'grade' => $grade->fresh(['student', 'subject'])]);
    }

    public function destroy(Request $request, $id)
    {
        Grade::whereHas('student', fn ($q) => $q->where('school_id', $request->user()->school_id))
            ->findOrFail($id)
            ->delete();

        return response()->json(['message' => 'Grade deleted successfully']);
    }

    public function getClassGrades(Request $request, $classId, $term)
    {
        Classe::where('school_id', $request->user()->school_id)->findOrFail($classId);

        return response()->json(
            Grade::with(['student.user', 'subject'])
                ->where('class_id', $classId)
                ->where('term', $term)
                ->get()
                ->groupBy('student_id')
        );
    }
}
