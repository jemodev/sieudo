<?php

namespace Database\Factories;

use App\Models\Opsu;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class OpsuFactory extends Factory
{
    protected $model = Opsu::class;

    public function definition(): array
    {
        return [
            'cedula' => $this->faker->word(),
            'apellidos' => $this->faker->word(),
            'nombres' => $this->faker->word(),
            'sexo' => $this->faker->word(),
            'fecha_nac' => $this->faker->word(),
            'codigo_nat' => $this->faker->word(),
            'codigo_tit' => $this->faker->word(),
            'fecha_grado' => $this->faker->word(),
            'libro' => $this->faker->word(),
            'folio' => $this->faker->word(),
            'nucleo_id' => $this->faker->randomNumber(),
            'promedio' => $this->faker->word(),
            'ubicacion' => $this->faker->word(),
            'mencion' => $this->faker->word(),
            'telefono' => $this->faker->word(),
            'correo' => $this->faker->word(),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ];
    }
}
