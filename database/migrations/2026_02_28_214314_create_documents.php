<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('document_type_id');
            $table->unsignedBigInteger('application_id');
            $table->unsignedBigInteger('specialty_id')->nullable();
            $table->string('code');
            $table->string('type');
            $table->string('graduate_id');
            $table->string('specialty_code');
            $table->boolean('support')->nullable();
            $table->string('status');
            $table->string('quantity');
            $table->string('document_application_position');
            $table->timestamp('transcription_date')->nullable();
            $table->string('transcriber_id')->nullable();
            $table->string('transcribed_file_path')->nullable();
            $table->timestamp('signature_date')->nullable();
            $table->string('signer_official_id')->nullable();
            $table->string('signed_file_path')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
