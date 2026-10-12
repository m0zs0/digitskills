<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'school_name',
        'teacher_name',
        'teacher_email',
        'teacher_phone',
        'team_name',
        'member1_name',
        'member2_name',
        'member3_name',
        'team_email',
    ];
}
