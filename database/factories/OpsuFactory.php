<?php

declare(strict_types=1);

namespace Database\Factories;

use App\Models\Opsu;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Opsu>
 */
class OpsuFactory extends Factory
{
    protected $model = Opsu::class;

    public function definition(): array
    {
        return [
            'cedula' => fake()->word(),
            'apellidos' => fake()->word(),
            'nombres' => fake()->word(),
            'sexo' => fake()->word(),
            'fecha_nac' => fake()->word(),
            'codigo_nat' => fake()->word(),
            'codigo_tit' => fake()->word(),
            'fecha_grado' => fake()->word(),
            'libro' => fake()->word(),
            'folio' => fake()->word(),
            'nucleo_id' => fake()->randomNumber(),
            'promedio' => fake()->word(),
            'ubicacion' => fake()->word(),
            'mencion' => fake()->word(),
            'telefono' => fake()->word(),
            'correo' => fake()->word(),
            'created_at' => \Illuminate\Support\Facades\Date::now(),
            'updated_at' => \Illuminate\Support\Facades\Date::now(),
        ];
    }
}
