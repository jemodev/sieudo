<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('system_statuses', function (Blueprint $table) {
            $table->id();

            $table->string('system_status');
            $table->integer('application_count')->nullable();
            $table->integer('max_applications')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('system_statusess');
    }
};
