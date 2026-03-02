<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Campus;
use Illuminate\Database\Seeder;

class CampusSeeder extends Seeder
{
    public function run(): void
    {
        Campus::query()->create([
            'code' => '0',
            'description' => 'DESCONOCIDO',
        ]);

        Campus::query()->create([
            'code' => '20',
            'description' => 'SUCRE',
        ]);

        Campus::query()->create([
            'code' => '30',
            'description' => 'ANZOÁTEGUI',
        ]);

        Campus::query()->create([
            'code' => '31',
            'description' => 'ANZ.(ANACO)',
        ]);

        Campus::query()->create([
            'code' => '32',
            'description' => 'ANZ.(CANTAURA)',
        ]);

        Campus::query()->create([
            'code' => '40',
            'description' => 'MONAGAS',
        ]);

        Campus::query()->create([
            'code' => '50',
            'description' => 'BOLÍVAR',
        ]);

        Campus::query()->create([
            'code' => '52',
            'description' => 'BOLÍVAR (CAICARA)',
        ]);

        Campus::query()->create([
            'code' => '60',
            'description' => 'NUEVA ESPARTA',
        ]);

        Campus::query()->create([
            'code' => '70',
            'description' => 'SUCRE (PARIA)',
        ]);

        Campus::query()->create([
            'code' => '80',
            'description' => 'BOLÍVAR (UEPO)',
        ]);

        Campus::query()->create([
            'code' => '90',
            'description' => 'RECTORADO (CGCE)',
        ]);

        Campus::query()->create([
            'code' => 'T',
            'description' => 'TODOS LOS NUCLEOS',
        ]);
    }
}
