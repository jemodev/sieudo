<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\DTOs\VerifyDniData;
use App\Models\Opsu;
use App\Models\User;
use Illuminate\Validation\ValidationException;

final class VerifyGraduateDni
{
    /** @return array{dni: string, nombres: string, apellidos: string, sexo: string, correo: string, telefono: string} */
    public function __invoke(VerifyDniData $data): array
    {
        $paddedDni = str_pad($data->dni, 8, '0', STR_PAD_LEFT);

        $opsu = Opsu::query()->where('cedula', $paddedDni)->first();

        if ($opsu === null) {
            throw ValidationException::withMessages(['type' => 'not_found']);
        }

        if (User::query()->where('dni', $paddedDni)->exists()) {
            throw ValidationException::withMessages(['type' => 'already_registered']);
        }

        return [
            'dni' => $opsu->cedula,
            'nombres' => $opsu->nombres,
            'apellidos' => $opsu->apellidos,
            'sexo' => $opsu->sexo,
            'correo' => $opsu->correo,
            'telefono' => $opsu->telefono,
        ];
    }
}
