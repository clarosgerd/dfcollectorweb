<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Forms;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type=$this->faker->randomElement(['text', 'textarea', 'number', 'date', 'dropdown', 'email', 'radio', 'checkbox']);
        $required=$this->faker->randomElement(['0', '1']);
        $order=$this->faker->randomElement(['0', '1', '2', '3']);
        return[
            'form_id'=>\App\Models\Form::factory(),
            'type'=>$type,
            'question_text'=>fake()->word(),
            'required'=>$required,
            'options'=>json_encode(["key" => $this->faker->randomNumber()] ),
            'validation'=>json_encode(["key" => $this->faker->randomNumber()] ),
          //  'order'=>$order,
            "created_at" => $this->faker->date('Y-m-d'),
            "updated_at" => $this->faker->date('Y-m-d'),
            //'json' => json_encode(["key" => $faker->randomNumber()] )
        ];
    }
}
