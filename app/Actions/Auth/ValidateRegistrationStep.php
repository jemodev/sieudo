<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\DTOs\ValidateRegistrationData;
use App\Models\User;
use Illuminate\Validation\ValidationException;

final class ValidateRegistrationStep
{
    public function __invoke(ValidateRegistrationData $data): void
    {
        if (User::query()->where('email', $data->email)->exists()) {
            throw ValidationException::withMessages(['email' => ['El correo ya está registrado.']]);
        }
    }
}
