<?php

declare(strict_types=1);

namespace App\Actions\Fortify;

use App\Actions\Auth\RegisterGraduate;
use App\DTOs\RegisterUserData;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;

final class CreateNewUser implements CreatesNewUsers
{
    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, mixed>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'dni' => ['required', 'string', 'digits_between:6,12'],
            'name' => ['required', 'string', 'max:255'],
            'surname' => ['required', 'string', 'max:255'],
            'gender' => ['required', Rule::in(['F', 'M'])],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'password' => ['required', 'string', 'min:8', 'max:20', 'confirmed'],
            'phone' => ['required', 'string', 'max:20'],
            'q1_id' => ['required', 'integer', 'exists:questions,id'],
            'q1_answer' => ['required', 'string'],
            'q2_id' => ['required', 'integer', 'exists:questions,id'],
            'q2_answer' => ['required', 'string'],
            'q3_id' => ['required', 'integer', 'exists:questions,id'],
            'q3_answer' => ['required', 'string'],
        ])->validate();

        $dto = new RegisterUserData(
            dni: $input['dni'],
            name: $input['name'],
            surname: $input['surname'],
            gender: $input['gender'],
            email: $input['email'],
            password: $input['password'],
            phone: $input['phone'],
            q1Id: (int) $input['q1_id'],
            q1Answer: $input['q1_answer'],
            q2Id: (int) $input['q2_id'],
            q2Answer: $input['q2_answer'],
            q3Id: (int) $input['q3_id'],
            q3Answer: $input['q3_answer'],
        );

        return (new RegisterGraduate)($dto);
    }
}
