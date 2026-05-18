<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Classe;
use App\Models\Grade;
use App\Models\Parente;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;

class AdminReportController extends Controller
{
    public function templates()
    {
        return response()->json([
            ['id' => 'academic', 'name' => 'Academic Performance Report'],
            ['id' => 'attendance', 'name' => 'Attendance Summary'],
            ['id' => 'enrollment', 'name' => 'Student Enrollment Report'],
            ['id' => 'staff', 'name' => 'Staff Performance Report'],
            ['id' => 'parents', 'name' => 'Parent Engagement Report'],
        ]);
    }

    public function generate(Request $request)
    {
        $data = $request->validate([
            'type' => 'required|in:academic,attendance,enrollment,staff,parents,custom',
            'date_range' => 'nullable|string',
            'class_id' => 'nullable|exists:classes,id',
            'format' => 'nullable|in:json,csv,pdf,excel',
        ]);

        $schoolId = $request->user()->school_id;
        $report = match ($data['type']) {
            'academic' => $this->academic($schoolId, $data),
            'attendance' => $this->attendance($schoolId, $data),
            'enrollment' => $this->enrollment($schoolId),
            'staff' => $this->staff($schoolId),
            'parents' => $this->parents($schoolId),
            default => $this->overview($schoolId),
        };

        return response()->json([
            'type' => $data['type'],
            'generated_at' => now(),
            'school_id' => $schoolId,
            'report' => $report,
        ]);
    }

    public function download(Request $request)
    {
        $payload = $this->generate($request)->getData(true);
        $format = $request->get('format', 'csv');

        if (!in_array($format, ['csv', 'excel'], true)) {
            return response()->json($payload);
        }

        $rows = $this->flattenRows($payload['report']);
        $csv = $this->toCsv($rows);
        $filename = $payload['type'] . '-report-' . now()->format('Ymd-His') . '.csv';

        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    private function academic(int $schoolId, array $filters): array
    {
        $query = Grade::with(['student.user', 'subject', 'studentClass'])
            ->whereHas('student', fn ($q) => $q->where('school_id', $schoolId));

        if (!empty($filters['class_id'])) {
            $query->where('class_id', $filters['class_id']);
        }

        $grades = $query->get();

        return [
            'total_marks' => $grades->count(),
            'average_percentage' => round((float) $grades->avg('percentage'), 2),
            'verified_marks' => $grades->where('verification_status', 'verified')->count(),
            'pending_marks' => $grades->where('verification_status', 'pending')->count(),
            'by_subject' => $grades->groupBy('subject.name')->map(fn ($items, $subject) => [
                'subject' => $subject,
                'entries' => $items->count(),
                'average_percentage' => round((float) $items->avg('percentage'), 2),
            ])->values(),
        ];
    }

    private function attendance(int $schoolId, array $filters): array
    {
        $query = Attendance::whereHas('student', fn ($q) => $q->where('school_id', $schoolId));

        if (!empty($filters['class_id'])) {
            $query->where('class_id', $filters['class_id']);
        }

        $records = $query->get();
        $total = max(1, $records->count());

        return [
            'total_records' => $records->count(),
            'present' => $records->where('status', 'present')->count(),
            'absent' => $records->where('status', 'absent')->count(),
            'late' => $records->where('status', 'late')->count(),
            'excused' => $records->where('status', 'excused')->count(),
            'present_rate' => round(($records->where('status', 'present')->count() / $total) * 100, 2),
        ];
    }

    private function enrollment(int $schoolId): array
    {
        return [
            'total_students' => Student::where('school_id', $schoolId)->count(),
            'active_students' => Student::where('school_id', $schoolId)->where('status', 'active')->count(),
            'classes' => Classe::withCount('students')->where('school_id', $schoolId)->get(['id', 'name', 'section']),
        ];
    }

    private function staff(int $schoolId): array
    {
        return [
            'total_teachers' => Teacher::where('school_id', $schoolId)->count(),
            'active_teachers' => Teacher::where('school_id', $schoolId)->where('status', 'active')->count(),
            'on_leave' => Teacher::where('school_id', $schoolId)->where('status', 'on_leave')->count(),
        ];
    }

    private function parents(int $schoolId): array
    {
        return [
            'total_parents' => Parente::where('school_id', $schoolId)->count(),
            'linked_children' => Student::where('school_id', $schoolId)->whereHas('parents')->count(),
        ];
    }

    private function overview(int $schoolId): array
    {
        return [
            'students' => Student::where('school_id', $schoolId)->count(),
            'teachers' => Teacher::where('school_id', $schoolId)->count(),
            'parents' => Parente::where('school_id', $schoolId)->count(),
            'classes' => Classe::where('school_id', $schoolId)->count(),
        ];
    }

    private function flattenRows(array $report): array
    {
        $rows = [];
        foreach ($report as $key => $value) {
            if (is_scalar($value) || $value === null) {
                $rows[] = ['metric' => $key, 'value' => $value];
            }
        }

        return $rows ?: [['metric' => 'report', 'value' => json_encode($report)]];
    }

    private function toCsv(array $rows): string
    {
        $handle = fopen('php://temp', 'r+');
        fputcsv($handle, array_keys($rows[0]));
        foreach ($rows as $row) {
            fputcsv($handle, $row);
        }
        rewind($handle);
        return stream_get_contents($handle);
    }
}
