<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class School extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'code', 'email', 'phone', 'address', 'city', 'region',
        'principal_name', 'website', 'about', 'curriculum', 'logo',
        'profile_image_url', 'cover_image_url', 'color', 'status', 'verified_at'
    ];

    protected $casts = [
        'curriculum' => 'array',
        'verified_at' => 'datetime',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function students()
    {
        return $this->hasMany(Student::class);
    }

    public function teachers()
    {
        return $this->hasMany(Teacher::class);
    }

    public function classes()
    {
        return $this->hasMany(Classe::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }

    public function posts()
    {
        return $this->hasMany(SchoolPost::class);
    }

    public function settings()
    {
        return $this->hasMany(SchoolSetting::class);
    }
}
