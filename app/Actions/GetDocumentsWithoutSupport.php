<?php

declare(strict_types=1);

namespace App\Actions;

use App\Models\DocumentType;
use App\Models\Speciality;
use Illuminate\Support\Collection;

final class GetDocumentsWithoutSupport
{
    /** @return Collection<int, DocumentType> */
    public function __invoke(Speciality $speciality): Collection
    {
        return DocumentType::query()
            ->where('support', false)
            ->where('visible', true)
            ->when(
                $speciality->type === 1,
                fn ($q) => $q->where('undergraduate_cost', '>', 0),
                fn ($q) => $q->where('graduate_cost', '>', 0),
            )
            ->orderBy('code')
            ->get();
    }
}
