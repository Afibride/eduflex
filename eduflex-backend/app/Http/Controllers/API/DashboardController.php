<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Classe;
use App\Models\Grade;
use App\Models\Parente;
use App\Models\Student;
use App\Models\Subject;
use App\Models\Teacher;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getStats(Request $request)
    {
        $schoolId = $request->user()->school_id;

        return response()->json([
            'total_students' => Student::where('school_id', $schoolId)->count(),
            'total_teachers' => Teacher::where('school_id', $schoolId)->count(),
            'total_parents' => Parente::where('school_id', $schoolId)->count(),
            'total_classes' => Classe::where('school_id', $schoolId)->count(),
            'total_subjects' => Subject::where('school_id', $schoolId)->count(),
            'recent_grades' => Grade::with(['student', 'subject'])
                ->whereHas('student', fn ($q) => $q->where('school_id', $schoolId))
                ->latest()
                ->take(5)
                ->get(),
            'today_attendance' => Attendance::whereHas('student', fn ($q) => $q->where('school_id', $schoolId))
                ->whereDate('date', now()->toDateString())
                ->get()
                ->groupBy('status')
                ->map->count(),
        ]);
    }
}
