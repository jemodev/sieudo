<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\DTOs\RecoverPasswordData;
use App\Models\User;
use Illuminate\Validation\ValidationException;

final class VerifyRecoveryDni
{
    /** @return array{questions: list<array{question: string}>, remaining_attempts: int} */
    public function __invoke(RecoverPasswordData $data): array
    {
        $paddedDni = str_pad($data->dni, 8, '0', STR_PAD_LEFT);

        $user = User::query()->where('dni', $paddedDni)->first();

        if ($user === null) {
            throw ValidationException::withMessages(['type' => 'not_found']);
        }

        if ($user->recovery_attempt >= 5) {
            throw ValidationException::withMessages(['type' => 'blocked']);
        }

        $answers = $user->answers()->with('question')->orderBy('id')->get();

        /** @var list<array{question: string}> $questions */
        $questions = array_values($answers->map(fn ($answer) => [
            'question' => $answer->question->question,
        ])->all());

        return [
            'questions' => $questions,
            'remaining_attempts' => 5 - $user->recovery_attempt,
        ];
    }
}
