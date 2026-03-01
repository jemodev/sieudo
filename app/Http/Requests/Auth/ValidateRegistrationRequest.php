<?php

declare(strict_types=1);

namespace App\Http\Requests\Auth;

use App\DTOs\ValidateRegistrationData;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

final class ValidateRegistrationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
        ];
    }

    public function toDto(): ValidateRegistrationData
    {
        return new ValidateRegistrationData(email: (string) $this->validated('email'));
    }
}
