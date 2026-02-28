<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Speciality extends Model
{
    /** @use HasFactory<\Database\Factories\SpecialityFactory> */
    use HasFactory;

    protected $fillable = [
        'code',
        'new_code',
        'name',
        'title',
        'type',
        'health_type',
    ];
}
