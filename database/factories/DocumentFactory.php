<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Enums\DocumentStatus;
use App\Models\Application;
use App\Models\Document;
use App\Models\DocumentType;
use App\Models\Speciality;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Date;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Document>
 */
class DocumentFactory extends Factory
{
    protected $model = Document::class;

    public function definition(): array
    {
        return [
            'document_type_id' => DocumentType::factory(),
            'application_id' => Application::factory(),
            'specialty_id' => Speciality::factory(),
            'code' => fake()->numerify('##########################'),
            'type' => fake()->word(),
            'graduate_id' => fake()->numerify('########'),
            'specialty_code' => fake()->numerify('###'),
            'support' => false,
            'status' => DocumentStatus::PendingPayment,
            'quantity' => '1',
            'document_application_position' => '01',
            'created_at' => Date::now(),
            'updated_at' => Date::now(),
        ];
    }
}
