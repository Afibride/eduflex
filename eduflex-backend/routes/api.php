<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\SchoolController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\TeacherController;
use App\Http\Controllers\API\ParentController;
use App\Http\Controllers\API\ClassController;
use App\Http\Controllers\API\SubjectController;
use App\Http\Controllers\API\GradeController;
use App\Http\Controllers\API\AttendanceController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\AnnouncementController;
use App\Http\Controllers\API\SchoolPostController;
use App\Http\Controllers\API\AdminReportController;
use App\Http\Controllers\API\AdminSettingsController;
use App\Http\Controllers\API\MarksVerificationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes (no authentication required)
Route::post('/register', [AuthController::class, 'registerSchool']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/activate', [AuthController::class, 'activateAccount']);

// Public school routes
Route::get('/schools', [SchoolController::class, 'index']);
Route::get('/schools/{id}/posts', [SchoolPostController::class, 'publicIndex']);
Route::get('/schools/{id}/announcements', [SchoolController::class, 'announcements']);
Route::get('/schools/{id}', [SchoolController::class, 'show']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Dashboard
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);
    Route::get('/school/dashboard', [SchoolController::class, 'getDashboardStats']);
    Route::get('/school/announcements', [SchoolController::class, 'myAnnouncements']);

    Route::middleware('role:admin')->group(function () {
        // School admin profile and school-management APIs
        Route::get('/admin/school/profile', [SchoolController::class, 'profile']);
        Route::put('/admin/school/profile', [SchoolController::class, 'updateProfile']);
        Route::get('/admin/schools', [SchoolController::class, 'adminIndex']);
        Route::post('/admin/schools', [SchoolController::class, 'store']);
        Route::put('/admin/schools/{id}', [SchoolController::class, 'update']);
        Route::delete('/admin/schools/{id}', [SchoolController::class, 'destroy']);

        // Public-facing school posts managed by school admins
        Route::get('/admin/school/posts', [SchoolPostController::class, 'index']);
        Route::post('/admin/school/posts', [SchoolPostController::class, 'store']);
        Route::get('/admin/school/posts/{id}', [SchoolPostController::class, 'show']);
        Route::put('/admin/school/posts/{id}', [SchoolPostController::class, 'update']);
        Route::delete('/admin/school/posts/{id}', [SchoolPostController::class, 'destroy']);

        // Announcements
        Route::get('/announcements', [AnnouncementController::class, 'index']);
        Route::post('/announcements', [AnnouncementController::class, 'store']);
        Route::get('/announcements/stats/summary', [AnnouncementController::class, 'stats']);
        Route::get('/announcements/{id}', [AnnouncementController::class, 'show']);
        Route::put('/announcements/{id}', [AnnouncementController::class, 'update']);
        Route::delete('/announcements/{id}', [AnnouncementController::class, 'destroy']);
        Route::post('/announcements/{id}/publish', [AnnouncementController::class, 'publish']);
        Route::post('/announcements/{id}/archive', [AnnouncementController::class, 'archive']);
        Route::post('/announcements/{id}/pin', [AnnouncementController::class, 'pin']);

        // Reports and settings
        Route::get('/admin/reports/templates', [AdminReportController::class, 'templates']);
        Route::post('/admin/reports/generate', [AdminReportController::class, 'generate']);
        Route::post('/admin/reports/download', [AdminReportController::class, 'download']);
        Route::get('/admin/settings', [AdminSettingsController::class, 'show']);
        Route::put('/admin/settings', [AdminSettingsController::class, 'update']);
        Route::post('/admin/settings/reset', [AdminSettingsController::class, 'reset']);
        Route::post('/admin/settings/clear-cache', [AdminSettingsController::class, 'clearCache']);

        // Marks verification
        Route::get('/admin/marks-verification', [MarksVerificationController::class, 'index']);
        Route::get('/admin/marks-verification/{batchId}', [MarksVerificationController::class, 'show']);
        Route::post('/admin/marks-verification/{batchId}/verify', [MarksVerificationController::class, 'verify']);
        Route::post('/admin/marks-verification/{batchId}/reject', [MarksVerificationController::class, 'reject']);
    });
    
    // Students
    Route::get('/students', [StudentController::class, 'index']);
    Route::post('/students', [StudentController::class, 'store'])->middleware('role:admin');
    Route::get('/students/{id}', [StudentController::class, 'show']);
    Route::put('/students/{id}', [StudentController::class, 'update'])->middleware('role:admin');
    Route::delete('/students/{id}', [StudentController::class, 'destroy'])->middleware('role:admin');
    Route::get('/students/{id}/activation-code', [StudentController::class, 'activationCode'])->middleware('role:admin');
    Route::get('/students/{id}/grades', [StudentController::class, 'getGrades']);
    Route::get('/students/{id}/attendance', [StudentController::class, 'getAttendance']);
    
    // Teachers
    Route::get('/teachers', [TeacherController::class, 'index']);
    Route::post('/teachers', [TeacherController::class, 'store'])->middleware('role:admin');
    Route::get('/teachers/{id}', [TeacherController::class, 'show']);
    Route::put('/teachers/{id}', [TeacherController::class, 'update'])->middleware('role:admin');
    Route::delete('/teachers/{id}', [TeacherController::class, 'destroy'])->middleware('role:admin');
    Route::get('/teachers/{id}/activation-code', [TeacherController::class, 'activationCode'])->middleware('role:admin');
    
    // Parents
    Route::get('/parents', [ParentController::class, 'index']);
    Route::post('/parents', [ParentController::class, 'store'])->middleware('role:admin');
    Route::get('/parents/{id}', [ParentController::class, 'show']);
    Route::put('/parents/{id}', [ParentController::class, 'update'])->middleware('role:admin');
    Route::delete('/parents/{id}', [ParentController::class, 'destroy'])->middleware('role:admin');
    Route::get('/parents/{id}/activation-code', [ParentController::class, 'activationCode'])->middleware('role:admin');
    Route::get('/parents/{id}/children', [ParentController::class, 'getChildren'])->middleware('role:admin');
    Route::post('/parents/{id}/link-student', [ParentController::class, 'linkStudent'])->middleware('role:admin');
    Route::delete('/parents/{id}/unlink-student/{studentId}', [ParentController::class, 'unlinkStudent'])->middleware('role:admin');
    Route::get('/parent/dashboard', [ParentController::class, 'dashboard']);
    Route::get('/parent/profile', [ParentController::class, 'profile']);
    
    // Classes
    Route::get('/classes/options', [ClassController::class, 'options']);
    Route::post('/classes/setup', [ClassController::class, 'setup']);
    Route::get('/classes', [ClassController::class, 'index']);
    Route::post('/classes', [ClassController::class, 'store']);
    Route::get('/classes/{id}', [ClassController::class, 'show']);
    Route::put('/classes/{id}', [ClassController::class, 'update']);
    Route::delete('/classes/{id}', [ClassController::class, 'destroy']);
    Route::get('/classes/{id}/students', [ClassController::class, 'getStudents']);
    
    // Subjects
    Route::get('/subjects', [SubjectController::class, 'index']);
    Route::post('/subjects', [SubjectController::class, 'store']);
    Route::put('/subjects/{id}', [SubjectController::class, 'update']);
    Route::delete('/subjects/{id}', [SubjectController::class, 'destroy']);
    
    // Grades
    Route::get('/grades', [GradeController::class, 'index']);
    Route::post('/grades', [GradeController::class, 'store']);
    Route::put('/grades/{id}', [GradeController::class, 'update']);
    Route::delete('/grades/{id}', [GradeController::class, 'destroy']);
    Route::get('/grades/class/{classId}/term/{term}', [GradeController::class, 'getClassGrades']);
    
    // Attendance
    Route::get('/attendance', [AttendanceController::class, 'index']);
    Route::post('/attendance', [AttendanceController::class, 'store']);
    Route::put('/attendance/{id}', [AttendanceController::class, 'update']);
    Route::get('/attendance/class/{classId}/date/{date}', [AttendanceController::class, 'getClassAttendance']);
});
