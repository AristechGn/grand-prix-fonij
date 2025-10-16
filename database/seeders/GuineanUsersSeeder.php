<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class GuineanUsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🌍 Génération des utilisateurs guinéens...');

        // Créer un super admin guinéen
        User::factory()->superAdmin()->create([
            'first_name' => 'Alpha',
            'last_name' => 'Conde',
            'email' => 'admin@grandprix-fonij.gn',
            'phone' => '+224 60 12 34 56',
            'address' => 'Quartier Alpha, Conakry',
            'profession' => 'Administrateur',
            'gender' => 'Homme',
            'birth_date' => '1980-05-15',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
        ]);

        $this->command->info('✅ Super admin créé');

        // Créer quelques administrateurs guinéens
        User::factory()->admin()->count(3)->create([
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
        ]);

        $this->command->info('✅ 3 administrateurs créés');

        // Créer des membres du jury guinéens
        User::factory()->jury()->count(10)->create([
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
        ]);

        $this->command->info('✅ 10 membres du jury créés');

        // Créer des candidats guinéens
        User::factory()->candidate()->count(30)->create([
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
        ]);

        $this->command->info('✅ 30 candidats créés');

        // Créer des utilisateurs réguliers guinéens
        User::factory()->count(60)->create([
            'role' => 'user',
            'email_verified_at' => now(),
            'phone_verified_at' => now(),
        ]);

        $this->command->info('✅ 60 utilisateurs réguliers créés');

        // Créer quelques utilisateurs non vérifiés pour la diversité
        User::factory()->unverified()->count(10)->create([
            'role' => fake()->randomElement(['user', 'candidate']),
        ]);

        $this->command->info('✅ 10 utilisateurs non vérifiés créés');

        // Créer des utilisateurs avec des profils spécifiques
        $this->createSpecificProfiles();

        $totalUsers = User::count();
        $this->command->info("🎉 Total d'utilisateurs guinéens créés : {$totalUsers}");
        
        $this->command->info('📊 Répartition par rôle :');
        $this->command->info('- Super Admin : ' . User::where('role', 'super_admin')->count());
        $this->command->info('- Admins : ' . User::where('role', 'admin')->count());
        $this->command->info('- Jury : ' . User::where('role', 'jury')->count());
        $this->command->info('- Candidats : ' . User::where('role', 'candidate')->count());
        $this->command->info('- Utilisateurs : ' . User::where('role', 'user')->count());
    }

    /**
     * Créer des profils spécifiques avec des données réalistes
     */
    private function createSpecificProfiles(): void
    {
        // Profils d'entrepreneurs guinéens
        $entrepreneurs = [
            [
                'first_name' => 'Fatoumata',
                'last_name' => 'Diallo',
                'email' => 'fatoumata.diallo@entrepreneur.gn',
                'phone' => '+224 61 23 45 67',
                'profession' => 'Entrepreneure',
                'address' => 'Quartier Kaloum, Conakry',
                'gender' => 'Femme',
                'birth_date' => '1985-03-20',
            ],
            [
                'first_name' => 'Mamadou',
                'last_name' => 'Keita',
                'email' => 'mamadou.keita@business.gn',
                'phone' => '+224 62 34 56 78',
                'profession' => 'Chef d\'entreprise',
                'address' => 'Secteur Matoto, Conakry',
                'gender' => 'Homme',
                'birth_date' => '1978-11-10',
            ],
        ];

        foreach ($entrepreneurs as $profile) {
            User::factory()->candidate()->create(array_merge($profile, [
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
            ]));
        }

        // Profils d'étudiants guinéens
        $students = [
            [
                'first_name' => 'Aminata',
                'last_name' => 'Sow',
                'email' => 'aminata.sow@student.gn',
                'phone' => '+224 63 45 67 89',
                'profession' => 'Étudiante',
                'address' => 'Campus de Kankan',
                'gender' => 'Femme',
                'birth_date' => '2000-07-15',
            ],
            [
                'first_name' => 'Sekou',
                'last_name' => 'Camara',
                'email' => 'sekou.camara@univ.gn',
                'phone' => '+224 64 56 78 90',
                'profession' => 'Étudiant',
                'address' => 'Université de Conakry',
                'gender' => 'Homme',
                'birth_date' => '1999-12-03',
            ],
        ];

        foreach ($students as $profile) {
            User::factory()->candidate()->create(array_merge($profile, [
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
            ]));
        }

        // Profils de professionnels guinéens
        $professionals = [
            [
                'first_name' => 'Mariama',
                'last_name' => 'Bah',
                'email' => 'mariama.bah@medecin.gn',
                'phone' => '+224 65 67 89 01',
                'profession' => 'Médecin',
                'address' => 'Hôpital Ignace Deen, Conakry',
                'gender' => 'Femme',
                'birth_date' => '1982-09-25',
            ],
            [
                'first_name' => 'Ibrahima',
                'last_name' => 'Traore',
                'email' => 'ibrahima.traore@ingenieur.gn',
                'phone' => '+224 66 78 90 12',
                'profession' => 'Ingénieur',
                'address' => 'Quartier Dixinn, Conakry',
                'gender' => 'Homme',
                'birth_date' => '1987-04-18',
            ],
        ];

        foreach ($professionals as $profile) {
            User::factory()->create(array_merge($profile, [
                'role' => 'user',
                'email_verified_at' => now(),
                'phone_verified_at' => now(),
            ]));
        }

        $this->command->info('✅ Profils spécifiques créés');
    }
}
