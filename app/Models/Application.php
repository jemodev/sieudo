<?php

declare(strict_types=1);

namespace App\Models;

use Database\Factories\ApplicationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

final class Application extends Model
{
    /** @use HasFactory<ApplicationFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'speciality_id',
        'code',
        'specialty_code',
        'application_date',
        'graduate_id',
        'status',
        'priority',
        'document_count',
        'document_support',
        'amount',
    ];

    /** @return BelongsTo<User, $this> */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** @return BelongsTo<Speciality, $this> */
    public function speciality(): BelongsTo
    {
        return $this->belongsTo(Speciality::class);
    }

    /** @return HasMany<Document, $this> */
    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    protected function casts(): array
    {
        return [
            'priority' => 'boolean',
            'document_support' => 'boolean',
            'application_date' => 'datetime',
        ];
    }
}
