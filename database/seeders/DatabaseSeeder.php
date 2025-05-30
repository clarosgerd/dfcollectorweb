<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Form;
use App\Models\Question;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         //User::factory(2)->create();

      /*  User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);*/


        $form = Form::factory()->create([
            'title' => 'Encuesta de Satisfacción',
        ]);

        $q1 = Question::create([
            'form_id' => $form->id,
            'question_text' => '¿Cuál es tu nombre?',
            'type' => 'text',
            'required' => true,
        ]);

        $q2 = Question::create([
            'form_id' => $form->id,
            'question_text' => 'Selecciona tu género',
            'type' => 'radio',
            'required' => true,
        ]);

        $q2->options()->createMany([
            ['option_text' => 'Masculino', 'order' => 0],
            ['option_text' => 'Femenino', 'order' => 1],
            ['option_text' => 'Otro', 'order' => 2],
        ]);

        $q3 = Question::create([
            'form_id' => $form->id,
            'question_text' => '¿Qué servicios utilizaste?',
            'type' => 'checkbox',
            'required' => false,
        ]);

        $q3->options()->createMany([
            ['option_text' => 'Soporte técnico', 'order' => 0],
            ['option_text' => 'Consultoría', 'order' => 1],
            ['option_text' => 'Capacitación', 'order' => 2],
        ]);

        $q4 = Question::create([
            'form_id' => $form->id,
            'question_text' => 'Comentarios adicionales',
            'type' => 'textarea',
            'required' => false,
        ]);

    }
}
