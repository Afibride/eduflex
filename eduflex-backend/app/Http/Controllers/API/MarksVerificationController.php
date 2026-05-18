<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use Illuminate\Http\Request;

class MarksVerificationController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->get('status', 'all');

        $grades = Grade::with(['student.user', 'subject', 'studentClass', 'submitter:id,name,email'])
            ->whereHas('student', fn ($q) => $q->where('school_id', $request->user()->school_id))
            ->when($status !== 'all', fn ($q) => $q->where('verification_status', $status))
            ->latest()
            ->get();

        $batches = $grades->groupBy(function ($grade) {
            return implode('|', [
                $grade->class_id,
                $grade->subject_id,
                $grade->term,
                $grade->academic_year,
                $grade->verification_status,
                $grade->submitted_by ?: 'none',
            ]);
        })->map(function ($items) {
            $first = $items->first();

            return [
                'id' => $this->batchId($first),
                'class_id' => $first->class_id,
                'class' => $first->studentClass?->name,
                'subject_id' => $first->subject_id,
                'subject' => $first->subject?->name,
                'teacher' => $first->submitter?->name ?? 'Unassigned',
                'submitted_by' => $first->submitted_by,
                'term' => $first->term,
                'academic_year' => $first->academic_year,
                'date' => optional($items->max('created_at'))->toDateString(),
                'status' => $first->verification_status,
                'students' => $items->pluck('student_id')->unique()->count(),
                'marks' => $items->values(),
            ];
        })->values();

        return response()->json($batches);
    }

    public function show(Request $request, string $batchId)
    {
        return response()->json($this->batchGrades($request, $batchId)->values());
    }

    public function verify(Request $request, string $batchId)
    {
        $grades = $this->batchGrades($request, $batchId);

        Grade::whereIn('id', $grades->pluck('id'))->update([
            'verification_status' => 'verified',
            'verified_by' => $request->user()->id,
            'verified_at' => now(),
            'rejection_reason' => null,
        ]);

        return response()->json(['message' => 'Marks verified successfully']);
    }

    public function reject(Request $request, string $batchId)
    {
        $data = $request->validate([
            'reason' => 'nullable|string|max:1000',
        ]);
        $grades = $this->batchGrades($request, $batchId);

        Grade::whereIn('id', $grades->pluck('id'))->update([
            'verification_status' => 'rejected',
            'verified_by' => $request->user()->id,
            'verified_at' => now(),
            'rejection_reason' => $data['reason'] ?? 'Rejected by school administrator',
        ]);

        return response()->json(['message' => 'Marks rejected successfully']);
    }

    private function batchGrades(Request $request, string $batchId)
    {
        $decoded = base64_decode(strtr($batchId, '-_', '+/'));
        [$classId, $subjectId, $term, $academicYear, $submittedBy] = explode(':', $decoded);

        return Grade::with(['student.user', 'subject', 'studentClass', 'submitter:id,name,email'])
            ->where('class_id', $classId)
            ->where('subject_id', $subjectId)
            ->where('term', $term)
            ->where('academic_year', $academicYear)
            ->when($submittedBy === 'none', fn ($q) => $q->whereNull('submitted_by'), fn ($q) => $q->where('submitted_by', $submittedBy))
            ->whereHas('student', fn ($q) => $q->where('school_id', $request->user()->school_id))
            ->get();
    }

    private function batchId(Grade $grade): string
    {
        return rtrim(strtr(base64_encode(implode(':', [
            $grade->class_id,
            $grade->subject_id,
            $grade->term,
            $grade->academic_year,
            $grade->submitted_by ?: 'none',
        ])), '+/', '-_'), '=');
    }
}
