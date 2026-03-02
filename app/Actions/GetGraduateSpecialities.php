<?php

declare(strict_types=1);

namespace App\Actions;

use App\DTOs\GraduateSpecialitiesData;
use App\Models\Opsu;
use App\Models\Speciality;
use Illuminate\Support\Collection;

final class GetGraduateSpecialities
{
    /** @return Collection<int, Speciality> */
    public function __invoke(GraduateSpecialitiesData $data): Collection
    {
        return Opsu::query()
            ->where('cedula', $data->dni)
            ->with('speciality')
            ->get()
            ->map(fn (Opsu $opsu) => $opsu->speciality)
            ->filter()
            ->unique('id')
            ->values();
    }
}
