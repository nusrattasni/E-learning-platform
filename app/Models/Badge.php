<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'icon',
        'trigger_type',
        'required_count',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot('earned_at');
    }
}
