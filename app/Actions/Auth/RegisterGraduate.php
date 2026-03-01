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

        Answer::query()->insert([
            ['user_id' => $user->id, 'question_id' => $data->q1Id, 'answer' => $data->q1Answer, 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => $user->id, 'question_id' => $data->q2Id, 'answer' => $data->q2Answer, 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => $user->id, 'question_id' => $data->q3Id, 'answer' => $data->q3Answer, 'created_at' => now(), 'updated_at' => now()],
        ]);

        return $user->fresh();
    }
}
