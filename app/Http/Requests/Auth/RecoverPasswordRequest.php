<?php

declare(strict_types=1);

namespace App\Http\Requests\Auth;

use App\DTOs\RecoverPasswordData;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

final class RecoverPasswordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'dni' => ['required', 'digits_between:6,12'],
        ];
    }

    public function toDto(): RecoverPasswordData
    {
        return new RecoverPasswordData(dni: (string) $this->validated('dni'));
    }
}
