<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Edition>
 */
class EditionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $year = fake()->numberBetween(2020, 2030);
        
        return [
            'name' => "Grand Prix FONIJ {$year}",
            'year' => $year,
            'start_date' => now()->addMonths(2),
            'end_date' => now()->addMonths(4),
            'registration_start_date' => now()->subDays(30),
            'registration_deadline' => now()->addDays(30),
            'max_participants' => fake()->numberBetween(50, 200),
            'description' => 'Description de l\'édition de test',
            'status' => 'active',
            'is_current' => false,
        ];
    }
}
