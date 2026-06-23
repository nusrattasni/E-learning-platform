<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function interactiveChallenges()
    {
        return $this->hasMany(InteractiveChallenge::class);
    }

    public function discussions()
    {
        return $this->hasMany(Discussion::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}
