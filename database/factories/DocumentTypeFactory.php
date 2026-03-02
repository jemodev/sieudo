<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\DocumentType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DocumentType>
 */
class DocumentTypeFactory extends Factory
{
    protected $model = DocumentType::class;

    public function definition(): array
    {
        return [
            'code' => fake()->word(),
            'description' => fake()->text(),
            'area' => fake()->word(),
            'support' => fake()->boolean(),
            'undergraduate_cost' => fake()->randomFloat(),
            'graduate_cost' => fake()->randomFloat(),
            'visible' => fake()->boolean(),
            'document_type' => fake()->randomNumber(),
            'observation' => fake()->word(),
            'created_at' => \Illuminate\Support\Facades\Date::now(),
            'updated_at' => \Illuminate\Support\Facades\Date::now(),
        ];
    }
}
