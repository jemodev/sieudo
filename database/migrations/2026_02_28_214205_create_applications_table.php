<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('speciality_id')->nullable()->constrained('specialities')->cascadeOnDelete();
            $table->string('code');
            $table->string('specialty_code');
            $table->timestamp('application_date');
            $table->string('graduate_id');
            $table->string('status');
            $table->boolean('priority');
            $table->integer('document_count');
            $table->boolean('document_support');
            $table->string('amount');
            $table->string('form')->nullable();
            $table->date('payment_date')->nullable();
            $table->timestamp('payment_registration_date')->nullable();
            $table->string('reviewer_id')->nullable();
            $table->timestamp('review_date')->nullable();
            $table->string('transcriber_id')->nullable();
            $table->timestamp('transcription_start_date')->nullable();
            $table->timestamp('transcription_end_date')->nullable();
            $table->string('signer_official_id')->nullable();
            $table->timestamp('signature_start')->nullable();
            $table->timestamp('signature_end')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
