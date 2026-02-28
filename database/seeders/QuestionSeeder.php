<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        Question::query()->create([
            'question' => '¿Cuál es el nombre de su mascota?',
        ]);

        Question::query()->create([
            'question' => '¿Cuál es su carro favorito?',
        ]);

        Question::query()->create([
            'question' => '¿Cuál es el nombre de su primer jefe?',
        ]);

        Question::query()->create([
            'question' => '¿En qué año nació su madre?',
        ]);

        Question::query()->create([
            'question' => '¿Cuál fue el lugar de nacimiento de su padre?',
        ]);

        Question::query()->create([
            'question' => '¿Cuál es su equipo deportivo favorito?',
        ]);

        Question::query()->create([
            'question' => '¿Cuál es su comida favorita?',
        ]);

        Question::query()->create([
            'question' => '¿Cuál fue su asignatura favorita?',
        ]);
    }
}
