<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Speciality;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Speciality>
 */
class SpecialityFactory extends Factory
{
    protected $model = Speciality::class;

    public function definition(): array
    {
        return [
            'code' => fake()->word(),
            'new_code' => fake()->word(),
            'name' => fake()->name(),
            'title' => fake()->word(),
            'type' => fake()->randomNumber(),
            'health_type' => fake()->word(),
            'created_at' => \Illuminate\Support\Facades\Date::now(),
            'updated_at' => \Illuminate\Support\Facades\Date::now(),
        ];
    }
}
