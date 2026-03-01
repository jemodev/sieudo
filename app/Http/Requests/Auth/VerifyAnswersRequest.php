<?php

declare(strict_types=1);

namespace App\Http\Requests\Auth;

use App\DTOs\VerifyAnswersData;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

final class VerifyAnswersRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'dni' => ['required', 'string'],
            'a1' => ['required', 'string', 'min:1'],
            'a2' => ['required', 'string', 'min:1'],
            'a3' => ['required', 'string', 'min:1'],
        ];
    }

    public function toDto(): VerifyAnswersData
    {
        $validated = $this->validated();

        return new VerifyAnswersData(
            dni: $validated['dni'],
            a1: $validated['a1'],
            a2: $validated['a2'],
            a3: $validated['a3'],
        );
    }
}
