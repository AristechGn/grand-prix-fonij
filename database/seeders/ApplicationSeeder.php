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

        // Données de test pour les candidatures
        $applicationsData = [
            [
                'first_name' => 'Aminata',
                'last_name' => 'Diallo',
                'email' => 'aminata.diallo@email.com',
                'phone' => '+224 612 34 56 78',
                'city' => 'Conakry',
                'region' => 'Conakry',
                'project_name' => 'AgriTech Connect',
                'category' => 'agri',
                'status' => 'validated',
                'score' => 85,
                'education_level' => 'universitaire',
                'profession' => 'Ingénieur agronome',
                'gender' => 'F',
            ],
            [
                'first_name' => 'Mamadou',
                'last_name' => 'Camara',
                'email' => 'mamadou.camara@email.com',
                'phone' => '+224 623 45 67 89',
                'city' => 'Kankan',
                'region' => 'Kankan',
                'project_name' => 'EduTech Mobile',
                'category' => 'tech',
                'status' => 'pending',
                'score' => null,
                'education_level' => 'universitaire',
                'profession' => 'Développeur',
                'gender' => 'M',
            ],
            [
                'first_name' => 'Fatoumata',
                'last_name' => 'Bah',
                'email' => 'fatoumata.bah@email.com',
                'phone' => '+224 634 56 78 90',
                'city' => 'Labé',
                'region' => 'Labé',
                'project_name' => 'Santé Communautaire',
                'category' => 'social',
                'status' => 'selected',
                'score' => 92,
                'education_level' => 'universitaire',
                'profession' => 'Médecin',
                'gender' => 'F',
            ],
            [
                'first_name' => 'Ibrahima',
                'last_name' => 'Sow',
                'email' => 'ibrahima.sow@email.com',
                'phone' => '+224 645 67 89 01',
                'city' => 'N\'Zérékoré',
                'region' => 'N\'Zérékoré',
                'project_name' => 'Green Energy Solutions',
                'category' => 'tech',
                'status' => 'finalist',
                'score' => 88,
                'education_level' => 'universitaire',
                'profession' => 'Ingénieur énergie',
                'gender' => 'M',
            ],
            [
                'first_name' => 'Mariama',
                'last_name' => 'Keita',
                'email' => 'mariama.keita@email.com',
                'phone' => '+224 656 78 90 12',
                'city' => 'Boké',
                'region' => 'Boké',
                'project_name' => 'Artisanat Digital',
                'category' => 'social',
                'status' => 'winner',
                'score' => 95,
                'education_level' => 'secondaire',
                'profession' => 'Artisan',
                'gender' => 'F',
            ],
        ];

        $this->command->info('Création des candidatures...');

        foreach ($applicationsData as $index => $appData) {
            // Sélectionner une édition aléatoire
            $edition = $editions->random();
            
            // Sélectionner un utilisateur aléatoire (optionnel)
            $user = $users->random();
            
            // Générer un numéro de candidature
            $applicationNumber = Application::generateApplicationNumber();
            
            // Calculer l'âge (entre 18 et 45 ans)
            $age = rand(18, 45);
            $birthDate = Carbon::now()->subYears($age)->subDays(rand(0, 365));
            
            // Dates de soumission (derniers 6 mois)
            $submittedAt = Carbon::now()->subDays(rand(0, 180))->subHours(rand(0, 23))->subMinutes(rand(0, 59));
            
            // Si la candidature a un score, elle a été examinée
            $reviewedAt = $appData['score'] ? $submittedAt->copy()->addDays(rand(1, 30)) : null;
            $reviewedBy = $appData['score'] ? $users->random()->id : null;

            Application::create([
                'edition_id' => $edition->id,
                'user_id' => $user->id,
                'application_number' => $applicationNumber,
                'status' => $appData['status'],
                'first_name' => $appData['first_name'],
                'last_name' => $appData['last_name'],
                'birth_date' => $birthDate,
                'age' => $age,
                'gender' => $appData['gender'],
                'email' => $appData['email'],
                'phone' => $appData['phone'],
                'city' => $appData['city'],
                'region' => $appData['region'],
                'education_level' => $appData['education_level'],
                'profession' => $appData['profession'],
                'category' => $appData['category'],
                'program' => null,
                'project_name' => $appData['project_name'],
                'project_summary' => $this->generateProjectSummary($appData['project_name'], $appData['category']),
                'problem_solved' => $this->generateProblemSolved($appData['category']),
                'expected_impact' => $this->generateExpectedImpact($appData['category']),
                'target_audience' => $this->generateTargetAudience($appData['category']),
                'project_launched' => rand(0, 1) == 1 ? 'oui' : 'non',
                'project_start_date' => rand(0, 1) == 1 ? Carbon::now()->subMonths(rand(1, 12)) : null,
                'prototype_exists' => rand(0, 1) == 1 ? 'oui' : 'non',
                'availability_morning' => rand(0, 1) == 1,
                'availability_afternoon' => rand(0, 1) == 1,
                'availability_evening' => rand(0, 1) == 1,
                'id_document_path' => 'applications/id_documents/sample_id_' . ($index + 1) . '.pdf',
                'business_plan_path' => 'applications/business_plans/sample_bp_' . ($index + 1) . '.pdf',
                'project_photo_path' => 'applications/project_photos/sample_photo_' . ($index + 1) . '.jpg',
                'presentation_video_url' => rand(0, 1) == 1 ? 'https://youtube.com/watch?v=sample_' . ($index + 1) : null,
                'certification_accuracy' => true,
                'free_participation' => true,
                'communication_authorization' => true,
                'score' => $appData['score'],
                'evaluation_notes' => $appData['score'] ? $this->generateEvaluationNotes($appData['score']) : null,
                'jury_scores' => $appData['score'] ? $this->generateJuryScores($appData['score']) : null,
                'submitted_at' => $submittedAt,
                'reviewed_at' => $reviewedAt,
                'reviewed_by' => $reviewedBy,
            ]);

            $this->command->info("Candidature créée: {$appData['first_name']} {$appData['last_name']} - {$appData['project_name']}");
        }

        $this->command->info('✅ ' . count($applicationsData) . ' candidatures créées avec succès!');
    }

    /**
     * Génère un résumé de projet basé sur le nom et la catégorie
     */
    private function generateProjectSummary(string $projectName, string $category): string
    {
        $summaries = [
            'agri' => [
                "Projet innovant visant à moderniser l'agriculture locale grâce aux nouvelles technologies.",
                "Solution agricole durable pour améliorer la productivité et la qualité des récoltes.",
                "Initiative d'agriculture intelligente pour réduire les pertes et optimiser les ressources.",
            ],
            'tech' => [
                "Application mobile révolutionnaire pour connecter les communautés locales.",
                "Plateforme technologique innovante pour résoudre les défis du quotidien.",
                "Solution digitale créative pour améliorer l'efficacité des services.",
            ],
            'social' => [
                "Projet social impactant pour améliorer les conditions de vie des communautés.",
                "Initiative communautaire pour promouvoir l'éducation et le développement.",
                "Programme social innovant pour l'autonomisation des populations vulnérables.",
            ],
        ];

        $categorySummaries = $summaries[$category] ?? $summaries['tech'];
        return $categorySummaries[array_rand($categorySummaries)];
    }

    /**
     * Génère une description du problème résolu
     */
    private function generateProblemSolved(string $category): string
    {
        $problems = [
            'agri' => [
                "Faible productivité agricole due aux méthodes traditionnelles",
                "Manque d'accès aux informations météorologiques pour les agriculteurs",
                "Difficultés de commercialisation des produits agricoles",
            ],
            'tech' => [
                "Manque de connectivité dans les zones rurales",
                "Difficultés d'accès aux services numériques",
                "Absence de solutions technologiques adaptées au contexte local",
            ],
            'social' => [
                "Inégalités d'accès à l'éducation et à la formation",
                "Manque de services de santé dans les zones reculées",
                "Difficultés d'intégration des populations vulnérables",
            ],
        ];

        $categoryProblems = $problems[$category] ?? $problems['tech'];
        return $categoryProblems[array_rand($categoryProblems)];
    }

    /**
     * Génère l'impact attendu
     */
    private function generateExpectedImpact(string $category): string
    {
        $impacts = [
            'agri' => [
                "Augmentation de 30% de la productivité agricole",
                "Réduction des pertes post-récolte de 40%",
                "Amélioration des revenus des agriculteurs de 50%",
            ],
            'tech' => [
                "Connexion de 10 000 personnes aux services numériques",
                "Réduction des coûts de communication de 60%",
                "Amélioration de l'efficacité des services de 45%",
            ],
            'social' => [
                "Formation de 500 personnes aux compétences professionnelles",
                "Amélioration de l'accès aux soins pour 2000 personnes",
                "Autonomisation de 300 femmes entrepreneures",
            ],
        ];

        $categoryImpacts = $impacts[$category] ?? $impacts['tech'];
        return $categoryImpacts[array_rand($categoryImpacts)];
    }

    /**
     * Génère le public cible
     */
    private function generateTargetAudience(string $category): string
    {
        $audiences = [
            'agri' => [
                "Agriculteurs et éleveurs des zones rurales",
                "Coopératives agricoles et organisations paysannes",
                "Jeunes entrepreneurs agricoles",
            ],
            'tech' => [
                "Entreprises locales et startups",
                "Étudiants et professionnels du secteur technologique",
                "Communautés rurales et urbaines",
            ],
            'social' => [
                "Femmes et jeunes des communautés défavorisées",
                "Étudiants et apprenants de tous âges",
                "Professionnels de la santé et de l'éducation",
            ],
        ];

        $categoryAudiences = $audiences[$category] ?? $audiences['tech'];
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
