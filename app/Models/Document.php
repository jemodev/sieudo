<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\DocumentStatus;
use Database\Factories\DocumentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

final class Document extends Model
{
    /** @use HasFactory<DocumentFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'document_type_id',
        'application_id',
        'specialty_id',
        'code',
        'type',
        'graduate_id',
        'specialty_code',
        'support',
        'status',
        'quantity',
        'document_application_position',
    ];

    /** @return BelongsTo<DocumentType, $this> */
    public function documentType(): BelongsTo
    {
        return $this->belongsTo(DocumentType::class);
    }

    /** @return BelongsTo<Application, $this> */
    public function application(): BelongsTo
    {
        return $this->belongsTo(Application::class);
    }

    /** @return BelongsTo<Speciality, $this> */
    public function speciality(): BelongsTo
    {
        return $this->belongsTo(Speciality::class, 'specialty_id');
    }

    protected function casts(): array
    {
        return [
            'support' => 'boolean',
            'status' => DocumentStatus::class,
        ];
    }
}
