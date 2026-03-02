<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'description',
        'area',
        'support',
        'undergraduate_cost',
        'graduate_cost',
        'visible',
        'document_type',
        'observation',
    ];

    protected function casts(): array
    {
        return [
            'support' => 'boolean',
            'visible' => 'boolean',
        ];
    }
}
