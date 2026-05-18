<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'school_id', 'class_id', 'student_number', 'first_name', 'last_name',
        'date_of_birth', 'gender', 'address', 'parent_phone', 'parent_email',
        'enrollment_date', 'status'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'enrollment_date' => 'date',
    ];

    protected $appends = ['full_name'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function studentClass()
    {
        return $this->belongsTo(Classe::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function parents()
    {
        return $this->belongsToMany(Parente::class, 'parent_student', 'student_id', 'parent_id')
                    ->withPivot('relationship')
                    ->withTimestamps();
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
