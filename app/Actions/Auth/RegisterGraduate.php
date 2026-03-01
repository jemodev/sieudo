<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\DTOs\RegisterUserData;
use App\Models\Answer;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class RegisterGraduate
{
    public function __invoke(RegisterUserData $data): User
    {
        $user = User::query()->create([
            'dni' => $data->dni,
            'name' => $data->name,
            'surname' => $data->surname,
            'gender' => $data->gender,
            'email' => $data->email,
            'password' => Hash::make($data->password),
            'phone' => $data->phone,
        ]);

        foreach ([
            [$data->q1Id, $data->q1Answer],
            [$data->q2Id, $data->q2Answer],
            [$data->q3Id, $data->q3Answer],
        ] as [$questionId, $answer]) {
            Answer::query()->create([
                'user_id' => $user->id,
                'question_id' => $questionId,
                'answer' => $answer,
            ]);
        }

        return $user->fresh();
    }
}
