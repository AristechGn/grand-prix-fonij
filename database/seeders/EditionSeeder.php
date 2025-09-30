<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Edition;
use Carbon\Carbon;

class EditionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $editions = [
            [
                'name' => 'Grand Prix FONIJ 2024',
                'year' => 2024,
                'description' => 'Édition 2024 du Grand Prix FONIJ pour l\'innovation et l\'entrepreneuriat en Guinée',
                'status' => 'completed',
                'is_current' => false,
                'start_date' => Carbon::create(2024, 1, 1),
                'end_date' => Carbon::create(2024, 12, 31),
                'registration_start_date' => Carbon::create(2023, 10, 1),
                'registration_deadline' => Carbon::create(2024, 2, 29),
                'max_participants' => 100,
            ],
            [
                'name' => 'Grand Prix FONIJ 2025',
                'year' => 2025,
                'description' => 'Édition 2025 du Grand Prix FONIJ pour l\'innovation et l\'entrepreneuriat en Guinée',
                'status' => 'active',
                'is_current' => true,
                'start_date' => Carbon::create(2025, 1, 1),
                'end_date' => Carbon::create(2025, 12, 31),
                'registration_start_date' => Carbon::create(2024, 10, 1),
                'registration_deadline' => Carbon::create(2025, 2, 28),
                'max_participants' => 150,
            ],
            [
                'name' => 'Grand Prix FONIJ 2023',
                'year' => 2023,
                'description' => 'Édition 2023 du Grand Prix FONIJ pour l\'innovation et l\'entrepreneuriat en Guinée',
                'status' => 'archived',
                'is_current' => false,
                'start_date' => Carbon::create(2023, 1, 1),
                'end_date' => Carbon::create(2023, 12, 31),
                'registration_start_date' => Carbon::create(2022, 10, 1),
                'registration_deadline' => Carbon::create(2023, 2, 28),
                'max_participants' => 80,
            ],
        ];

        $this->command->info('Création des éditions...');

        foreach ($editions as $editionData) {
            Edition::create($editionData);
            $this->command->info("Édition créée: {$editionData['name']}");
        }

        $this->command->info('✅ ' . count($editions) . ' éditions créées avec succès!');
    }
}