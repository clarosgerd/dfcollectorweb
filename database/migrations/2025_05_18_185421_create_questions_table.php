<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained()->onDelete('cascade');
            $table->text('question_text');
            $table->enum('type', ['text', 'textarea', 'number', 'date', 'dropdown', 'email', 'radio', 'checkbox']);
            $table->boolean('required')->default(false);
            $table->json('options')->nullable(); // Para opciones de selección
            $table->json('validation')->nullable(); // Validaciones adicionales
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
