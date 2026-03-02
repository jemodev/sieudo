<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('system_statuses')
            ->insert(['system_status' => '1', 'created_at' => now(), 'updated_at' => now()]);

        $this->call([
            CampusSeeder::class,
            SpecialitySeeder::class,
            DocumentTypeSeeder::class,
            QuestionSeeder::class,
            OpsuSeeder::class,
        ]);
    }
}
