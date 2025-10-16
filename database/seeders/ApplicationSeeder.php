<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Application;
use App\Models\Edition;
use App\Models\User;
use Carbon\Carbon;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Vérifier qu'il y a des éditions et des utilisateurs
        $editions = Edition::all();
        $users = User::all();

        if ($editions->isEmpty()) {
            $this->command->warn('Aucune édition trouvée. Créez d\'abord des éditions.');
            return;
        }

        if ($users->isEmpty()) {
            $this->command->warn('Aucun utilisateur trouvé. Créez d\'abord des utilisateurs.');
            return;
        }

        $this->command->info('🌍 Génération des candidatures guinéennes...');

        // Données guinéennes pour générer des candidatures réalistes
        $guineanData = $this->getGuineanData();

        $totalApplications = 0;

        // Générer au moins 100 candidatures par édition
        foreach ($editions as $edition) {
            $this->command->info("📝 Génération des candidatures pour l'édition: {$edition->name}");
            
            $applicationsPerEdition = rand(100, 150); // Entre 100 et 150 candidatures par édition
            
            for ($i = 0; $i < $applicationsPerEdition; $i++) {
                $this->createGuineanApplication($edition, $users, $guineanData, $i + 1);
            }
            
            $totalApplications += $applicationsPerEdition;
            $this->command->info("✅ {$applicationsPerEdition} candidatures créées pour l'édition {$edition->name}");
        }

        $this->command->info("🎉 Total de {$totalApplications} candidatures créées avec succès!");
    }

    /**
     * Crée une candidature guinéenne réaliste
     */
    private function createGuineanApplication($edition, $users, $guineanData, $index): void
    {
        // Sélectionner un utilisateur candidat aléatoire
        $candidateUsers = $users->where('role', 'candidate');
        if ($candidateUsers->isEmpty()) {
            $user = $users->random();
        } else {
            $user = $candidateUsers->random();
        }

        // Générer un numéro de candidature unique avec timestamp et index
        $applicationNumber = 'FONIJ-' . date('Ymd') . '-' . str_pad($index, 4, '0', STR_PAD_LEFT) . '-' . strtoupper(substr(uniqid(), -4));
        
        // Données personnelles aléatoires
        $gender = fake()->randomElement(['M', 'F']);
        $firstName = $gender === 'M' 
            ? fake()->randomElement($guineanData['maleFirstNames'])
            : fake()->randomElement($guineanData['femaleFirstNames']);
        $lastName = fake()->randomElement($guineanData['lastNames']);
        $city = fake()->randomElement($guineanData['cities']);
        $region = $this->getRegionFromCity($city);
        
        // Génération d'un numéro de téléphone guinéen unique
        $phonePrefixes = ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'];
        $phoneNumber = '+224 ' . fake()->randomElement($phonePrefixes) . ' ' . fake()->unique()->numerify('## ## ##');
        
        // Email unique
        $email = strtolower($firstName . '.' . $lastName . '.' . fake()->unique()->numerify('###') . '@' . fake()->randomElement(['gmail.com', 'yahoo.fr', 'hotmail.com', 'outlook.com']));
            
            // Calculer l'âge (entre 18 et 45 ans)
            $age = rand(18, 45);
            $birthDate = Carbon::now()->subYears($age)->subDays(rand(0, 365));
        
        // Catégorie et projet
        $category = fake()->randomElement([1, 2, 3, 4, 5]);
        $projectData = $this->generateProjectData($category, $guineanData);
        
        // Statut et score
        $statusData = $this->generateStatusAndScore();
            
            // Dates de soumission (derniers 6 mois)
            $submittedAt = Carbon::now()->subDays(rand(0, 180))->subHours(rand(0, 23))->subMinutes(rand(0, 59));
            
            // Si la candidature a un score, elle a été examinée
        $reviewedAt = $statusData['score'] ? $submittedAt->copy()->addDays(rand(1, 30)) : null;
        $reviewedBy = $statusData['score'] ? $users->where('role', 'jury')->random()->id ?? $users->random()->id : null;

            Application::create([
                'edition_id' => $edition->id,
                'user_id' => $user->id,
                'application_number' => $applicationNumber,
            'status' => $statusData['status'],
            'first_name' => $firstName,
            'last_name' => $lastName,
                'birth_date' => $birthDate,
                'age' => $age,
            'gender' => $gender,
            'email' => $email,
            'phone' => $phoneNumber,
            'city' => $city,
            'region' => $region,
            'education_level' => fake()->randomElement(['primaire', 'secondaire', 'universitaire', 'technique']),
            'profession' => fake()->randomElement($guineanData['professions']),
            'category' => $category,
                'program' => null,
            'project_name' => $projectData['name'],
            'project_summary' => $projectData['summary'],
            'problem_solved' => $projectData['problem'],
            'expected_impact' => $projectData['impact'],
            'target_audience' => $projectData['audience'],
                'project_launched' => rand(0, 1) == 1 ? 'oui' : 'non',
                'project_start_date' => rand(0, 1) == 1 ? Carbon::now()->subMonths(rand(1, 12)) : null,
                'prototype_exists' => rand(0, 1) == 1 ? 'oui' : 'non',
                'availability_morning' => rand(0, 1) == 1,
                'availability_afternoon' => rand(0, 1) == 1,
                'availability_evening' => rand(0, 1) == 1,
            'id_document_path' => 'applications/id_documents/sample_id_' . $index . '.pdf',
            'business_plan_path' => 'applications/business_plans/sample_bp_' . $index . '.pdf',
            'project_photo_path' => 'applications/project_photos/sample_photo_' . $index . '.jpg',
            'presentation_video_url' => rand(0, 1) == 1 ? 'https://youtube.com/watch?v=sample_' . $index : null,
                'certification_accuracy' => true,
                'free_participation' => true,
                'communication_authorization' => true,
            'score' => $statusData['score'],
            'evaluation_notes' => $statusData['score'] ? $this->generateEvaluationNotes($statusData['score']) : null,
            'jury_scores' => $statusData['score'] ? $this->generateJuryScores($statusData['score']) : null,
                'submitted_at' => $submittedAt,
                'reviewed_at' => $reviewedAt,
                'reviewed_by' => $reviewedBy,
            ]);
    }

    /**
     * Retourne les données guinéennes pour générer des candidatures réalistes
     */
    private function getGuineanData(): array
    {
        return [
            'maleFirstNames' => [
                'Mamadou', 'Ibrahima', 'Alpha', 'Mohamed', 'Ousmane', 'Sekou', 'Amadou', 'Boubacar',
                'Moussa', 'Abdoulaye', 'Saidou', 'Lamine', 'Fode', 'Bakary', 'Mamady', 'Souleymane',
                'Thierno', 'Mamadouba', 'Sekouba', 'Fodeba', 'Mamadouba', 'Sekouba', 'Fodeba', 'Mamadouba',
                'Sekouba', 'Fodeba', 'Mamadouba', 'Sekouba', 'Fodeba', 'Mamadouba', 'Sekouba', 'Fodeba'
            ],
            'femaleFirstNames' => [
                'Fatoumata', 'Mariama', 'Aminata', 'Kadiatou', 'Aissatou', 'Hawa', 'Kadiatou', 'Mariama',
                'Fatoumata', 'Aminata', 'Aissatou', 'Hawa', 'Kadiatou', 'Mariama', 'Fatoumata', 'Aminata',
                'Aissatou', 'Hawa', 'Kadiatou', 'Mariama', 'Fatoumata', 'Aminata', 'Aissatou', 'Hawa',
                'Kadiatou', 'Mariama', 'Fatoumata', 'Aminata', 'Aissatou', 'Hawa', 'Kadiatou', 'Mariama'
            ],
            'lastNames' => [
                'Diallo', 'Bah', 'Camara', 'Sow', 'Barry', 'Traore', 'Keita', 'Conde', 'Sylla', 'Toure',
                'Cisse', 'Sangare', 'Kone', 'Drame', 'Fofana', 'Coulibaly', 'Diakite', 'Kante', 'Sidibe',
                'Doumbouya', 'Bangoura', 'Kourouma', 'Kouyate', 'Diabate', 'Coulibaly', 'Traore', 'Keita',
                'Conde', 'Sylla', 'Toure', 'Cisse', 'Sangare', 'Kone', 'Drame', 'Fofana'
            ],
            'cities' => [
                'Conakry', 'Kankan', 'Kindia', 'Boké', 'Labé', 'Mamou', 'Faranah', 'Nzérékoré', 'Kissidougou',
                'Guéckédou', 'Macenta', 'Siguiri', 'Dabola', 'Pita', 'Télimélé', 'Coyah', 'Dubréka', 'Forécariah',
                'Mandiana', 'Kouroussa', 'Kérouané', 'Beyla', 'Yomou', 'Lola', 'Gaoual', 'Tougué', 'Koubia',
                'Dalaba', 'Mali', 'Lélouma', 'Télimélé', 'Coyah', 'Dubréka', 'Forécariah', 'Mandiana'
            ],
            'professions' => [
                'Enseignant', 'Médecin', 'Ingénieur', 'Commerçant', 'Agriculteur', 'Étudiant', 'Fonctionnaire',
                'Infirmier', 'Pharmacien', 'Avocat', 'Journaliste', 'Artisan', 'Chauffeur', 'Secrétaire',
                'Comptable', 'Technicien', 'Électricien', 'Plombier', 'Cuisinier', 'Serveur', 'Garde',
                'Agent de sécurité', 'Réceptionniste', 'Vendeur', 'Gestionnaire', 'Directeur', 'Chef de projet',
                'Développeur', 'Designer', 'Photographe', 'Musicien', 'Artiste', 'Écrivain', 'Traducteur'
            ],
            'projectNames' => [
                1 => [ // Promotion de l'esprit d'entreprise
                    'Inspire Entrepreneur', 'Jeunesse Active', 'Créativité Locale', 'Esprit Innovant',
                    'Dynamisme Communautaire', 'Leadership Jeune', 'Initiative Créative', 'Passion Entrepreneuriale'
                ],
                2 => [ // Éducation aux compétences entrepreneuriales
                    'Formation Pro', 'Compétences Plus', 'Apprentissage Pratique', 'Développement Talents',
                    'Formation Innovante', 'Savoir-Faire Local', 'Éducation Moderne', 'Compétences Avancées'
                ],
                3 => [ // Transition numérique
                    'Tech Connect', 'Digital Solution', 'Innovation Mobile', 'Plateforme Intelligente',
                    'App Communautaire', 'Service Digital', 'Technologie Locale', 'Solution Connectée'
                ],
                4 => [ // Entrepreneuriat agricole durable
                    'AgriTech Plus', 'Ferme Intelligente', 'Agriculture Moderne', 'Produits Bio',
                    'Technologie Agricole', 'Innovation Rurale', 'Développement Agricole', 'Agriculture Durable'
                ],
                5 => [ // Grand prix du jury
                    'Innovation Exceptionnelle', 'Projet Révolutionnaire', 'Solution Créative', 'Initiative Unique',
                    'Projet Innovant', 'Solution Avancée', 'Projet Créatif', 'Innovation Locale'
                ]
            ]
        ];
    }

    /**
     * Génère les données du projet selon la catégorie
     */
    private function generateProjectData(int $category, array $guineanData): array
    {
        $projectNames = $guineanData['projectNames'][$category] ?? $guineanData['projectNames'][3];
        $projectName = fake()->randomElement($projectNames) . ' ' . fake()->randomElement(['Guinée', 'Conakry', 'Local', 'Communautaire']);
        
        return [
            'name' => $projectName,
            'summary' => $this->generateProjectSummary($projectName, $category),
            'problem' => $this->generateProblemSolved($category),
            'impact' => $this->generateExpectedImpact($category),
            'audience' => $this->generateTargetAudience($category),
        ];
    }

    /**
     * Génère le statut et le score de la candidature
     */
    private function generateStatusAndScore(): array
    {
        $rand = rand(1, 100);
        
        if ($rand <= 5) {
            return ['status' => 'winner', 'score' => rand(90, 100)];
        } elseif ($rand <= 15) {
            return ['status' => 'finalist', 'score' => rand(80, 89)];
        } elseif ($rand <= 30) {
            return ['status' => 'selected', 'score' => rand(70, 79)];
        } elseif ($rand <= 60) {
            return ['status' => 'validated', 'score' => rand(60, 69)];
        } elseif ($rand <= 85) {
            return ['status' => 'pending', 'score' => null];
        } else {
            return ['status' => 'rejected', 'score' => rand(30, 59)];
        }
    }

    /**
     * Retourne la région correspondant à une ville
     */
    private function getRegionFromCity(string $city): string
    {
        $cityRegionMap = [
            'Conakry' => 'Conakry',
            'Kankan' => 'Kankan',
            'Kindia' => 'Kindia',
            'Boké' => 'Boké',
            'Labé' => 'Labé',
            'Mamou' => 'Mamou',
            'Faranah' => 'Faranah',
            'Nzérékoré' => 'Nzérékoré',
            'Kissidougou' => 'Nzérékoré',
            'Guéckédou' => 'Nzérékoré',
            'Macenta' => 'Nzérékoré',
            'Siguiri' => 'Kankan',
            'Dabola' => 'Faranah',
            'Pita' => 'Labé',
            'Télimélé' => 'Kindia',
            'Coyah' => 'Conakry',
            'Dubréka' => 'Conakry',
            'Forécariah' => 'Conakry',
            'Mandiana' => 'Kankan',
            'Kouroussa' => 'Kankan',
            'Kérouané' => 'Nzérékoré',
            'Beyla' => 'Nzérékoré',
            'Yomou' => 'Nzérékoré',
            'Lola' => 'Nzérékoré',
            'Gaoual' => 'Boké',
            'Tougué' => 'Labé',
            'Koubia' => 'Labé',
            'Dalaba' => 'Mamou',
            'Mali' => 'Labé',
            'Lélouma' => 'Labé',
        ];

        return $cityRegionMap[$city] ?? 'Conakry';
    }

    /**
     * Génère un résumé de projet basé sur le nom et la catégorie (ID)
     */
    private function generateProjectSummary(string $projectName, int $category): string
    {
        $summaries = [
            1 => [ // Promotion de l'esprit d'entreprise
                "Projet innovant pour promouvoir la culture entrepreneuriale chez les jeunes.",
                "Initiative inspirante pour susciter l'envie d'entreprendre dans la société.",
                "Programme créatif pour dynamiser l'écosystème entrepreneurial local.",
            ],
            2 => [ // Éducation aux compétences entrepreneuriales
                "Formation pratique aux compétences essentielles de l'entrepreneuriat.",
                "Programme éducatif pour développer les savoir-faire entrepreneuriaux.",
                "Initiative d'apprentissage pour renforcer les capacités des jeunes entrepreneurs.",
            ],
            3 => [ // Transition numérique
                "Application mobile révolutionnaire pour connecter les communautés locales.",
                "Plateforme technologique innovante pour résoudre les défis du quotidien.",
                "Solution digitale créative pour améliorer l'efficacité des services.",
            ],
            4 => [ // Entrepreneuriat agricole durable
                "Projet innovant visant à moderniser l'agriculture locale grâce aux nouvelles technologies.",
                "Solution agricole durable pour améliorer la productivité et la qualité des récoltes.",
                "Initiative d'agriculture intelligente pour réduire les pertes et optimiser les ressources.",
            ],
            5 => [ // Grand prix du jury
                "Projet exceptionnellement créatif avec un impact transformateur.",
                "Initiative audacieuse qui révolutionne son domaine d'application.",
                "Solution innovante qui change la donne dans son secteur.",
            ],
        ];

        $categorySummaries = $summaries[$category] ?? $summaries[3];
        return $categorySummaries[array_rand($categorySummaries)];
    }

    /**
     * Génère une description du problème résolu
     */
    private function generateProblemSolved(int $category): string
    {
        $problems = [
            1 => [ // Promotion de l'esprit d'entreprise
                "Manque de culture entrepreneuriale chez les jeunes",
                "Absence d'inspiration et de modèles entrepreneuriaux",
                "Faible dynamisme de l'écosystème entrepreneurial local",
            ],
            2 => [ // Éducation aux compétences entrepreneuriales
                "Manque de formation pratique aux compétences entrepreneuriales",
                "Difficultés d'accès aux savoir-faire essentiels",
                "Absence de programmes d'accompagnement spécialisés",
            ],
            3 => [ // Transition numérique
                "Manque de connectivité dans les zones rurales",
                "Difficultés d'accès aux services numériques",
                "Absence de solutions technologiques adaptées au contexte local",
            ],
            4 => [ // Entrepreneuriat agricole durable
                "Faible productivité agricole due aux méthodes traditionnelles",
                "Manque d'accès aux informations météorologiques pour les agriculteurs",
                "Difficultés de commercialisation des produits agricoles",
            ],
            5 => [ // Grand prix du jury
                "Défis complexes nécessitant des solutions créatives",
                "Problématiques nécessitant une approche révolutionnaire",
                "Challenges nécessitant une innovation exceptionnelle",
            ],
        ];

        $categoryProblems = $problems[$category] ?? $problems[3];
        return $categoryProblems[array_rand($categoryProblems)];
    }

    /**
     * Génère l'impact attendu
     */
    private function generateExpectedImpact(int $category): string
    {
        $impacts = [
            1 => [ // Promotion de l'esprit d'entreprise
                "Inspiration de 1000 jeunes à entreprendre",
                "Création d'un écosystème entrepreneurial dynamique",
                "Formation de 200 mentors entrepreneuriaux",
            ],
            2 => [ // Éducation aux compétences entrepreneuriales
                "Formation de 500 personnes aux compétences professionnelles",
                "Amélioration des capacités de 300 entrepreneurs",
                "Développement des compétences de 200 femmes entrepreneures",
            ],
            3 => [ // Transition numérique
                "Connexion de 10 000 personnes aux services numériques",
                "Réduction des coûts de communication de 60%",
                "Amélioration de l'efficacité des services de 45%",
            ],
            4 => [ // Entrepreneuriat agricole durable
                "Augmentation de 30% de la productivité agricole",
                "Réduction des pertes post-récolte de 40%",
                "Amélioration des revenus des agriculteurs de 50%",
            ],
            5 => [ // Grand prix du jury
                "Impact transformateur sur 5000 personnes",
                "Innovation révolutionnaire dans le secteur",
                "Changement de paradigme dans l'approche du problème",
            ],
        ];

        $categoryImpacts = $impacts[$category] ?? $impacts[3];
        return $categoryImpacts[array_rand($categoryImpacts)];
    }

    /**
     * Génère le public cible
     */
    private function generateTargetAudience(int $category): string
    {
        $audiences = [
            1 => [ // Promotion de l'esprit d'entreprise
                "Jeunes entrepreneurs et aspirants entrepreneurs",
                "Étudiants et jeunes diplômés",
                "Communautés locales et organisations de jeunesse",
            ],
            2 => [ // Éducation aux compétences entrepreneuriales
                "Jeunes entrepreneurs en formation",
                "Femmes entrepreneures et populations vulnérables",
                "Professionnels en reconversion",
            ],
            3 => [ // Transition numérique
                "Entreprises locales et startups",
                "Étudiants et professionnels du secteur technologique",
                "Communautés rurales et urbaines",
            ],
            4 => [ // Entrepreneuriat agricole durable
                "Agriculteurs et éleveurs des zones rurales",
                "Coopératives agricoles et organisations paysannes",
                "Jeunes entrepreneurs agricoles",
            ],
            5 => [ // Grand prix du jury
                "Communautés diverses et populations variées",
                "Secteurs multiples et domaines variés",
                "Public général et société civile",
            ],
        ];

        $categoryAudiences = $audiences[$category] ?? $audiences[3];
        return $categoryAudiences[array_rand($categoryAudiences)];
    }

    /**
     * Génère des notes d'évaluation basées sur le score
     */
    private function generateEvaluationNotes(int $score): string
    {
        if ($score >= 90) {
            return "Excellente candidature avec un projet très innovant et un impact social important. Fort potentiel de réussite.";
        } elseif ($score >= 80) {
            return "Très bonne candidature avec un projet solide et des perspectives prometteuses.";
        } elseif ($score >= 70) {
            return "Bonne candidature avec des points positifs mais nécessite quelques améliorations.";
        } elseif ($score >= 60) {
            return "Candidature acceptable mais le projet nécessite un développement plus approfondi.";
        } else {
            return "Candidature rejetée. Le projet ne répond pas aux critères requis ou présente des lacunes importantes.";
        }
    }

    /**
     * Génère des scores de jury simulés
     */
    private function generateJuryScores(int $baseScore): array
    {
        $juryCount = rand(3, 5);
        $scores = [];
        
        for ($i = 1; $i <= $juryCount; $i++) {
            // Variation de ±10 points par rapport au score de base
            $variation = rand(-10, 10);
            $juryScore = max(0, min(100, $baseScore + $variation));
            $scores["jury_{$i}"] = $juryScore;
        }
        
        return $scores;
    }
}
