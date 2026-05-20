<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'school_id', 'teacher_number', 'first_name', 'last_name',
        'date_of_birth', 'gender', 'subjects', 'hire_date', 'status'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'hire_date' => 'date',
        'subjects' => 'array',
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

    public function homeroomClasses()
    {
        return $this->hasMany(Classe::class, 'homeroom_teacher_id');
    }

    public function teachingClasses()
    {
        return $this->belongsToMany(Classe::class, 'class_teacher', 'teacher_id', 'class_id')
            ->withTimestamps();
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
