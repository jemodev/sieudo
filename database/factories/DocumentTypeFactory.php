<?php

namespace Database\Factories;

use App\Models\DocumentType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class DocumentTypeFactory extends Factory
{
    protected $model = DocumentType::class;

    public function definition(): array
    {
        return [
            'code' => $this->faker->word(),
            'description' => $this->faker->text(),
            'area' => $this->faker->word(),
            'support' => $this->faker->boolean(),
            'undergraduate_cost' => $this->faker->randomFloat(),
            'graduate_cost' => $this->faker->randomFloat(),
            'visible' => $this->faker->boolean(),
            'document_type' => $this->faker->randomNumber(),
            'observation' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
