<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Prénoms guinéens masculins
     */
    private array $maleFirstNames = [
        'Mamadou', 'Ibrahima', 'Alpha', 'Mohamed', 'Ousmane', 'Sekou', 'Amadou', 'Boubacar',
        'Moussa', 'Abdoulaye', 'Saidou', 'Lamine', 'Fode', 'Bakary', 'Mamady', 'Souleymane',
        'Thierno', 'Mamadouba', 'Sekouba', 'Fodeba', 'Mamadouba', 'Sekouba', 'Fodeba', 'Mamadouba',
        'Sekouba', 'Fodeba', 'Mamadouba', 'Sekouba', 'Fodeba', 'Mamadouba', 'Sekouba', 'Fodeba'
    ];

    /**
     * Prénoms guinéens féminins
     */
    private array $femaleFirstNames = [
        'Fatoumata', 'Mariama', 'Aminata', 'Kadiatou', 'Aissatou', 'Hawa', 'Kadiatou', 'Mariama',
        'Fatoumata', 'Aminata', 'Aissatou', 'Hawa', 'Kadiatou', 'Mariama', 'Fatoumata', 'Aminata',
        'Aissatou', 'Hawa', 'Kadiatou', 'Mariama', 'Fatoumata', 'Aminata', 'Aissatou', 'Hawa',
        'Kadiatou', 'Mariama', 'Fatoumata', 'Aminata', 'Aissatou', 'Hawa', 'Kadiatou', 'Mariama'
    ];

    /**
     * Noms de famille guinéens
     */
    private array $lastNames = [
        'Diallo', 'Bah', 'Camara', 'Sow', 'Barry', 'Traore', 'Keita', 'Conde', 'Sylla', 'Toure',
        'Cisse', 'Sangare', 'Kone', 'Drame', 'Fofana', 'Coulibaly', 'Diakite', 'Kante', 'Sidibe',
        'Doumbouya', 'Bangoura', 'Kourouma', 'Kouyate', 'Diabate', 'Coulibaly', 'Traore', 'Keita',
        'Conde', 'Sylla', 'Toure', 'Cisse', 'Sangare', 'Kone', 'Drame', 'Fofana'
    ];

    /**
     * Villes guinéennes
     */
    private array $cities = [
        'Conakry', 'Kankan', 'Kindia', 'Boké', 'Labé', 'Mamou', 'Faranah', 'Nzérékoré', 'Kissidougou',
        'Guéckédou', 'Macenta', 'Siguiri', 'Dabola', 'Pita', 'Télimélé', 'Coyah', 'Dubréka', 'Forécariah',
        'Mandiana', 'Kouroussa', 'Kérouané', 'Beyla', 'Yomou', 'Lola', 'Gaoual', 'Tougué', 'Koubia',
        'Dalaba', 'Mali', 'Lélouma', 'Télimélé', 'Coyah', 'Dubréka', 'Forécariah', 'Mandiana'
    ];

    /**
     * Professions communes en Guinée
     */
    private array $professions = [
        'Enseignant', 'Médecin', 'Ingénieur', 'Commerçant', 'Agriculteur', 'Étudiant', 'Fonctionnaire',
        'Infirmier', 'Pharmacien', 'Avocat', 'Journaliste', 'Artisan', 'Chauffeur', 'Secrétaire',
        'Comptable', 'Technicien', 'Électricien', 'Plombier', 'Cuisinier', 'Serveur', 'Garde',
        'Agent de sécurité', 'Réceptionniste', 'Vendeur', 'Gestionnaire', 'Directeur', 'Chef de projet',
        'Développeur', 'Designer', 'Photographe', 'Musicien', 'Artiste', 'Écrivain', 'Traducteur'
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = fake()->randomElement(['Homme', 'Femme']);
        $firstName = $gender === 'Homme' 
            ? fake()->randomElement($this->maleFirstNames)
            : fake()->randomElement($this->femaleFirstNames);
        
        $lastName = fake()->randomElement($this->lastNames);
        $city = fake()->randomElement($this->cities);
        
        // Génération d'un numéro de téléphone guinéen (format: +224 XX XX XX XX)
        $phonePrefixes = ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'];
        $phoneNumber = '+224 ' . fake()->randomElement($phonePrefixes) . ' ' . fake()->unique()->numerify('## ## ##');
        
        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => strtolower($firstName . '.' . $lastName . '.' . fake()->unique()->numerify('###') . '@' . fake()->randomElement(['gmail.com', 'yahoo.fr', 'hotmail.com', 'outlook.com'])),
            'phone' => $phoneNumber,
            'email_verified_at' => fake()->optional(0.8)->dateTimeBetween('-1 year', 'now'),
            'phone_verified_at' => fake()->optional(0.7)->dateTimeBetween('-1 year', 'now'),
            'role' => fake()->randomElement(['user', 'candidate', 'jury']),
            'address' => fake()->randomElement(['Quartier', 'Secteur', 'Commune']) . ' ' . fake()->randomElement(['Alpha', 'Beta', 'Gamma', 'Delta']) . ', ' . $city,
            'birth_date' => fake()->dateTimeBetween('-65 years', '-18 years')->format('Y-m-d'),
            'gender' => $gender,
            'profession' => fake()->randomElement($this->professions),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
            'phone_verified_at' => null,
        ]);
    }

    /**
     * Créer un utilisateur avec le rôle admin
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'admin',
        ]);
    }

    /**
     * Créer un utilisateur avec le rôle super_admin
     */
    public function superAdmin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'super_admin',
        ]);
    }

    /**
     * Créer un utilisateur avec le rôle jury
     */
    public function jury(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'jury',
        ]);
    }

    /**
     * Créer un utilisateur avec le rôle candidate
     */
    public function candidate(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => 'candidate',
        ]);
    }
}
