<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Campus;
use Illuminate\Database\Seeder;

class CampusSeeder extends Seeder
{
    public function run(): void
    {
        Campus::create([
            'code' => '0',
            'description' => 'DESCONOCIDO',
        ]);

        Campus::create([
            'code' => '20',
            'description' => 'SUCRE',
        ]);

        Campus::create([
            'code' => '30',
            'description' => 'ANZOÁTEGUI',
        ]);

        Campus::create([
            'code' => '31',
            'description' => 'ANZ.(ANACO)',
        ]);

        Campus::create([
            'code' => '32',
            'description' => 'ANZ.(CANTAURA)',
        ]);

        Campus::create([
            'code' => '40',
            'description' => 'MONAGAS',
        ]);

        Campus::create([
            'code' => '50',
            'description' => 'BOLÍVAR',
        ]);

        Campus::create([
            'code' => '52',
            'description' => 'BOLÍVAR (CAICARA)',
        ]);

        Campus::create([
            'code' => '60',
            'description' => 'NUEVA ESPARTA',
        ]);

        Campus::create([
            'code' => '70',
            'description' => 'SUCRE (PARIA)',
        ]);

        Campus::create([
            'code' => '80',
            'description' => 'BOLÍVAR (UEPO)',
        ]);

        Campus::create([
            'code' => '90',
            'description' => 'RECTORADO (CGCE)',
        ]);

        Campus::create([
            'code' => 'T',
            'description' => 'TODOS LOS NUCLEOS',
        ]);
    }
}
