<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = [
        'school_id',
        'author_id',
        'title',
        'content',
        'audience',
        'priority',
        'status',
        'scheduled_at',
        'expires_at',
        'published_at',
        'is_pinned',
        'views',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'expires_at' => 'date',
        'published_at' => 'datetime',
        'is_pinned' => 'boolean',
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
