<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\DTOs\StoreApplicationData;
use App\Models\Speciality;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

final class StoreApplicationRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'document_codes' => ['required', 'array', 'min:1'],
            'document_codes.*' => ['string', 'exists:document_types,code'],
        ];
    }

    public function toDto(Speciality $speciality): StoreApplicationData
    {
        /** @var \App\Models\User $user */
        $user = $this->user();

        return new StoreApplicationData(
            userId: $user->id,
            graduateId: str_pad((string) $user->dni, 8, '0', STR_PAD_LEFT),
            specialityId: $speciality->id,
            specialityNewCode: $speciality->new_code,
            specialityType: $speciality->type,
            documentTypeCodes: (array) $this->validated('document_codes'),
        );
    }
}
