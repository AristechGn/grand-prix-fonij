<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $birthDate = fake()->dateTimeBetween('-50 years', '-18 years');
        $age = now()->diffInYears($birthDate);
        
        return [
            'edition_id' => \App\Models\Edition::factory(),
            'user_id' => null,
            'application_number' => 'APP' . fake()->unique()->numberBetween(100000, 999999),
            'status' => 'pending',
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'birth_date' => $birthDate->format('Y-m-d'),
            'age' => $age,
            'gender' => fake()->randomElement(['homme', 'femme']),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'city' => fake()->city(),
            'region' => fake()->randomElement(['Conakry', 'Kindia', 'Boké', 'Mamou', 'Labé', 'Faranah', 'Kankan', 'Nzérékoré']),
            'education_level' => fake()->randomElement(['Primaire', 'Collège', 'Lycée', 'Baccalauréat', 'Licence/Bachelor', 'Master', 'Doctorat']),
            'profession' => fake()->jobTitle(),
            'category' => fake()->numberBetween(1, 5),
            'program' => fake()->randomElement(['acceleration', 'incubation', 'formation']),
            'project_name' => 'Projet de test',
            'project_summary' => 'Description du projet de test',
            'problem_solved' => 'Problème résolu par le projet',
            'expected_impact' => 'Impact attendu du projet',
            'target_audience' => 'Public cible du projet',
            'project_launched' => fake()->randomElement(['oui', 'non']),
            'project_start_date' => fake()->optional()->date(),
            'prototype_exists' => fake()->randomElement(['oui', 'non']),
            'availability_morning' => fake()->boolean(),
            'availability_afternoon' => fake()->boolean(),
            'availability_evening' => fake()->boolean(),
            'id_document_path' => 'applications/id_documents/test.pdf',
            'business_plan_path' => 'applications/business_plans/test.pdf',
            'project_photo_path' => 'applications/project_photos/test.jpg',
            'presentation_video_url' => fake()->optional()->url(),
            'certification_accuracy' => true,
            'free_participation' => true,
            'communication_authorization' => true,
            'submitted_at' => now(),
        ];
    }
}
