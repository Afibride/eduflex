<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolSetting extends Model
{
    protected $fillable = [
        'school_id',
        'group',
        'values',
    ];

    protected $casts = [
        'values' => 'array',
    ];

    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
