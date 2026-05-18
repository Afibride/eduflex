<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'school_id', 'name', 'section', 'academic_year', 'homeroom_teacher_id', 'capacity'
    ];

    protected $appends = ['full_name', 'students_count'];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function homeroomTeacher()
    {
        return $this->belongsTo(Teacher::class, 'homeroom_teacher_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'class_id');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function getFullNameAttribute()
    {
        return $this->section ? "{$this->name} {$this->section}" : $this->name;
    }

    public function getStudentsCountAttribute()
    {
        return array_key_exists('students_count', $this->attributes)
            ? $this->attributes['students_count']
            : $this->students()->count();
    }
}
