<?php

namespace Database\Factories;

use App\Models\Speciality;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class SpecialityFactory extends Factory
{
    protected $model = Speciality::class;

    public function definition(): array
    {
        return [
            'code' => $this->faker->word(),
            'new_code' => $this->faker->word(),
            'name' => $this->faker->name(),
            'title' => $this->faker->word(),
            'type' => $this->faker->randomNumber(),
            'health_type' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
