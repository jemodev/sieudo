<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\CampusFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campus extends Model
{
    /** @use HasFactory<CampusFactory> */
    use HasFactory;

    protected $table = 'campus';

    protected $fillable = [
        'code',
        'description',
    ];
}
