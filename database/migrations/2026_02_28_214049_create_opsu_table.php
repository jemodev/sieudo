<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('opsu', function (Blueprint $table) {
            $table->id();

            $table->string('cedula')->nullable();
            $table->string('apellidos')->nullable();
            $table->string('nombres')->nullable();
            $table->string('sexo')->nullable();
            $table->string('fecha_nac')->nullable();
            $table->string('codigo_nat')->nullable();
            $table->string('codigo_tit')->nullable();
            $table->string('fecha_grado')->nullable();
            $table->string('libro')->nullable();
            $table->string('folio')->nullable();
            $table->unsignedBigInteger('nucleo_id')->nullable();
            $table->string('promedio')->nullable();
            $table->string('ubicacion')->nullable();
            $table->string('mencion')->nullable();
            $table->string('telefono')->nullable();
            $table->string('correo')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('opsu');
    }
};
