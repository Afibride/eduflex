<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolPost extends Model
{
    protected $fillable = [
        'school_id',
        'author_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'category',
        'image_url',
        'status',
        'published_at',
        'is_featured',
        'views',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'is_featured' => 'boolean',
        'views' => 'integer',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
