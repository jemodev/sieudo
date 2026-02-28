<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    public function run(): void
    {
        Question::create([
            'question' => '¿Cuál es el nombre de su mascota?',
        ]);

        Question::create([
            'question' => '¿Cuál es su carro favorito?',
        ]);

        Question::create([
            'question' => '¿Cuál es el nombre de su primer jefe?',
        ]);

        Question::create([
            'question' => '¿En qué año nació su madre?',
        ]);

        Question::create([
            'question' => '¿Cuál fue el lugar de nacimiento de su padre?',
        ]);

        Question::create([
            'question' => '¿Cuál es su equipo deportivo favorito?',
        ]);

        Question::create([
            'question' => '¿Cuál es su comida favorita?',
        ]);

        Question::create([
            'question' => '¿Cuál fue su asignatura favorita?',
        ]);
    }
}
