<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\School;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\Classe;
use Illuminate\Http\Request;

class SchoolController extends Controller
{
    public function index()
    {
        $schools = School::where('status', 'active')->get();
        return response()->json($schools);
    }

    public function show($id)
    {
        $school = School::with(['users', 'classes'])->findOrFail($id);
        
        // Get counts
        $studentCount = Student::where('school_id', $id)->count();
        $teacherCount = Teacher::where('school_id', $id)->count();
        $classCount = Classe::where('school_id', $id)->count();
        
        return response()->json([
            'school' => $school,
            'stats' => [
                'students' => $studentCount,
                'teachers' => $teacherCount,
                'classes' => $classCount,
            ]
        ]);
    }

    public function getDashboardStats(Request $request)
    {
        $schoolId = $request->user()->school_id;
        
        $stats = [
            'total_students' => Student::where('school_id', $schoolId)->count(),
            'total_teachers' => Teacher::where('school_id', $schoolId)->count(),
            'total_classes' => Classe::where('school_id', $schoolId)->count(),
            'active_students' => Student::where('school_id', $schoolId)->where('status', 'active')->count(),
        ];
        
        return response()->json($stats);
    }
}