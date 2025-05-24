<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Enterprise>
 */
class EnterpriseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
      //  ini_set('memory_limit','-1'); 
        return [
            'name' => fake()->word(),
         //   'created_by' => \App\Models\User::factory(),
        ];
    }
}
