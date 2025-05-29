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
            $table->enum('type', [
                'text',         // Texto corto
                'textarea',     // Texto largo
                'radio',        // Selección única
                'checkbox',     // Múltiple selección
                'select',       // Lista desplegable
                'range',        // Escala numérica
                'date',         // Fecha
                'time',         // Hora
                'datetime',     // Fecha y hora
                'file',         // Subida de archivo
                'rating',       // Puntuación con estrellas/emojis
                'linear_scale'  // Escala lineal (ej. 1-5)
            ]);
            $table->text('question_text');
            $table->boolean('is_required')->default(false);
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
