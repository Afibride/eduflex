<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'school_id', 'name', 'section', 'education_level', 'stream', 'academic_year', 'homeroom_teacher_id', 'capacity'
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

    public function teachers()
    {
        return $this->belongsToMany(Teacher::class, 'class_teacher', 'class_id', 'teacher_id')
            ->withTimestamps();
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
        $name = $this->section ? "{$this->name} {$this->section}" : $this->name;
        return $this->stream ? "{$name} - {$this->stream}" : $name;
    }

    public function getStudentsCountAttribute()
    {
        return array_key_exists('students_count', $this->attributes)
            ? $this->attributes['students_count']
            : $this->students()->count();
    }
}
