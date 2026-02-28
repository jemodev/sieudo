<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('specialities', function (Blueprint $table) {
            $table->id();

            $table->string('code');
            $table->string('new_code');
            $table->string('name');
            $table->string('title');
            $table->integer('type');
            $table->string('health_type');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('specialities');
    }
};
