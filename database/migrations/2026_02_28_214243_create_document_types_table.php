<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('document_types', function (Blueprint $table) {
            $table->id();

            $table->string('code');
            $table->text('description');
            $table->string('area');
            $table->boolean('support');
            $table->double('undergraduate_cost');
            $table->double('graduate_cost');
            $table->boolean('visible');
            $table->integer('document_type');
            $table->string('observation');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('document_types');
    }
};
