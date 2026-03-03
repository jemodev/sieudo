<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\DocumentType;
use App\Models\Speciality;
use Illuminate\Support\Collection;

final class GetDocumentsWithSupport
{
    /** @return Collection<int, DocumentType> */
    public function __invoke(Speciality $speciality): Collection
    {
        return DocumentType::query()
            ->where('support', true)
            ->where('visible', true)
            ->where(function ($q) use ($speciality): void {
                $q->whereIn('document_type', [1, 3, 4])
                    ->orWhere(function ($q2) use ($speciality): void {
                        $q2->where('document_type', 2)
                            ->when($speciality->health_type !== '2', fn ($q3) => $q3->whereRaw('0=1'));
                    });
            })
            ->orderBy('code')
            ->get();
    }
}
