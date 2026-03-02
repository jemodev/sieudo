<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemStatus extends Model
{
    /** @use HasFactory<\Database\Factories\SystemStatusFactory> */
    use HasFactory;

    protected $fillable = [
        'system_status',
        'application_count',
        'max_applications',
    ];

    protected function casts(): array
    {
        return [
            'system_status' => 'integer',
            'application_count' => 'integer',
            'max_applications' => 'integer',
        ];
    }
}
