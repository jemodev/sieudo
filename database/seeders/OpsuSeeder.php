<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OpsuSeeder extends Seeder
{
    public function run(): void
    {
        $sql = file_get_contents(database_path('opsu.sql'));

        if ($sql) {
            DB::statement($sql);
        }
    }
}
