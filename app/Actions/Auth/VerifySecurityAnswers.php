<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\DTOs\VerifyAnswersData;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

final class VerifySecurityAnswers
{
    /** @return array{token: string, email: string} */
    public function __invoke(VerifyAnswersData $data): array
    {
        $paddedDni = str_pad($data->dni, 8, '0', STR_PAD_LEFT);

        $user = User::query()->where('dni', $paddedDni)->first();

        if ($user === null) {
            throw ValidationException::withMessages(['type' => 'not_found']);
        }

        if ($user->recovery_attempt >= 5) {
            throw ValidationException::withMessages(['type' => 'blocked']);
        }

        $answers = $user->answers()->orderBy('id')->get();

        $inputs = [$data->a1, $data->a2, $data->a3];
        $allCorrect = true;

        foreach ($answers as $index => $record) {
            $input = strtolower(trim($inputs[$index] ?? ''));

            if (!Hash::check($input, $record->getRawOriginal('answer'))) {
                $allCorrect = false;
                break;
            }
        }

        if (!$allCorrect) {
            $user->increment('recovery_attempt');
            $remaining = 5 - $user->fresh()->recovery_attempt;

            throw ValidationException::withMessages([
                'type' => 'wrong_answers',
                'remaining' => (string) $remaining,
            ]);
        }

        $user->update(['recovery_attempt' => 0]);

        session()->flash('recovery_user', [
            'dni' => $user->dni,
            'name' => $user->full_name,
        ]);

        return [
            'token' => Password::createToken($user),
            'email' => $user->email,
        ];
    }
}
