<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\DTOs\LoginData;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

final class AttemptLogin
{
    public function __invoke(LoginData $data): User
    {
        $paddedDni = str_pad($data->dni, 8, '0', STR_PAD_LEFT);

        $user = User::query()->where('dni', $paddedDni)->first();

        if ($user === null) {
            throw ValidationException::withMessages([
                'dni' => ['La cédula ingresada no corresponde a ningún usuario registrado.'],
            ]);
        }

        if ($user->login_attempt >= 3) {
            throw ValidationException::withMessages(['blocked' => ['account_blocked']]);
        }

        if (!Hash::check($data->password, $user->password)) {
            $user->increment('login_attempt');
            $newCount = $user->fresh()->login_attempt;

            if ($newCount >= 3) {
                throw ValidationException::withMessages(['blocked' => ['account_blocked']]);
            }

            $remaining = 3 - $newCount;
            $message = $remaining === 1
                ? 'Contraseña incorrecta. Le queda 1 intento.'
                : "Contraseña incorrecta. Le quedan {$remaining} intentos.";

            throw ValidationException::withMessages(['password' => [$message]]);
        }

        $user->update(['login_attempt' => 0]);

        return $user;
    }
}
