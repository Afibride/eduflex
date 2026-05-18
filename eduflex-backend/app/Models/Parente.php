<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Parente extends Model
{
    use HasFactory;

    protected $table = 'parents';

    protected $fillable = [
        'user_id',
        'school_id',
        'parent_number',
        'first_name',
        'last_name',
        'phone',
        'email',
        'address',
        'occupation',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = ['full_name'];

    /**
     * Get the user account associated with the parent
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the school that the parent belongs to
     */
    public function school()
    {
        return $this->belongsTo(School::class);
    }

    /**
     * Get all students linked to this parent
     */
    public function students()
    {
        return $this->belongsToMany(Student::class, 'parent_student', 'parent_id', 'student_id')
                    ->withPivot('relationship')
                    ->withTimestamps();
    }

    /**
     * Get all children (students) with their relationship type
     */
    public function children()
    {
        return $this->students();
    }

    /**
     * Get the full name attribute
     */
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    /**
     * Check if parent has a specific student as child
     */
    public function hasStudent($studentId)
    {
        return $this->students()->where('student_id', $studentId)->exists();
    }

    /**
     * Get the relationship type with a specific student
     */
    public function getRelationshipWithStudent($studentId)
    {
        $student = $this->students()
            ->where('student_id', $studentId)
            ->first();

        return $student ? $student->pivot->relationship : null;
    }

    /**
     * Scope a query to only include parents of active students
     */
    public function scopeWithActiveChildren($query)
    {
        return $query->whereHas('students', function ($q) {
            $q->where('status', 'active');
        });
    }

    /**
     * Get the parent's dashboard stats
     */
    public function getDashboardStats()
    {
        $children = $this->students()->with(['studentClass', 'grades'])->get();
        
        $stats = [
            'total_children' => $children->count(),
            'attendance_summary' => [],
            'grades_summary' => [],
            'upcoming_events' => [],
        ];

        foreach ($children as $child) {
            // Get recent attendance
            $stats['attendance_summary'][$child->id] = Attendance::where('student_id', $child->id)
                ->whereMonth('date', now()->month)
                ->get()
                ->groupBy('status')
                ->map->count();

            // Get average grades per term
            $stats['grades_summary'][$child->id] = Grade::where('student_id', $child->id)
                ->selectRaw('term, AVG(percentage) as average')
                ->groupBy('term')
                ->get();
        }

        return $stats;
    }
}
