<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Application;
use App\Models\Speciality;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Date;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory
{
    protected $model = Application::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'speciality_id' => Speciality::factory(),
            'code' => fake()->numerify('######################'),
            'specialty_code' => fake()->numerify('###'),
            'application_date' => Date::now(),
            'graduate_id' => fake()->numerify('########'),
            'status' => '0',
            'priority' => false,
            'document_count' => fake()->numberBetween(1, 10),
            'document_support' => false,
            'amount' => '0.00',
            'created_at' => Date::now(),
            'updated_at' => Date::now(),
        ];
    }
}
