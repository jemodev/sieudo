<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Answer>
 */
class AnswerFactory extends Factory
{
    protected $model = Answer::class;

    public function definition(): array
    {
        return [
            'answer' => fake()->word(),
            'created_at' => \Illuminate\Support\Facades\Date::now(),
            'updated_at' => \Illuminate\Support\Facades\Date::now(),

            'user_id' => User::factory(),
            'question_id' => Question::factory(),
        ];
    }
}
