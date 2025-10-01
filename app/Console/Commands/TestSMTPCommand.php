<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ApplicationConfirmationMail;
use App\Models\Application;
use App\Models\Edition;

class TestSMTPCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:smtp {email=aristechdev@gmail.com}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Teste la configuration SMTP';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        $this->info('🔍 Test de la configuration SMTP...');
        
        // Afficher la configuration actuelle
        $this->info('📧 Configuration actuelle :');
        $this->line('  - Host: ' . config('mail.mailers.smtp.host'));
        $this->line('  - Port: ' . config('mail.mailers.smtp.port'));
        $this->line('  - Encryption: ' . (config('mail.mailers.smtp.encryption') ?? 'none'));
        $this->line('  - Username: ' . config('mail.mailers.smtp.username'));
        $this->line('  - Password: ' . (config('mail.mailers.smtp.password') ? '***configuré***' : '❌ NON CONFIGURÉ'));
        $this->line('  - From: ' . config('mail.from.address'));
        $this->newLine();
        
        try {
            $this->info('📤 Création d\'une candidature de test...');
            
            // Créer une édition de test
            $edition = Edition::factory()->create([
                'is_current' => true,
                'status' => 'active',
                'registration_start_date' => now()->subDays(10),
                'registration_deadline' => now()->addDays(10),
                'year' => 2024,
            ]);
            
            $this->info("✅ Édition créée : Grand Prix FONIJ {$edition->year}");
            
            // Créer une candidature de test
            $application = Application::factory()->create([
                'edition_id' => $edition->id,
                'status' => 'pending',
                'email' => $email,
                'first_name' => 'Jean-Marie',
                'last_name' => 'Gnimassou',
                'project_name' => 'Test Project SMTP',
                'submitted_at' => now(),
            ]);
            
            $this->info("✅ Candidature créée : {$application->application_number}");
            
            $this->info('📤 Envoi de l\'email de confirmation...');
            
            // Configuration SSL locale pour le développement
            $sslKeyPath = storage_path('ssl/local.key');
            $sslCertPath = storage_path('ssl/local.crt');
            
            if (file_exists($sslKeyPath) && file_exists($sslCertPath)) {
                $this->info('🔐 Utilisation des clés SSL locales');
                config([
                    'mail.default' => 'smtp',
                    'mail.mailers.smtp.host' => 'mail.grandprixfonij.com',
                    'mail.mailers.smtp.port' => 465,
                    'mail.mailers.smtp.encryption' => 'ssl',
                    'mail.mailers.smtp.username' => 'contact@grandprixfonij.com',
                    'mail.mailers.smtp.password' => env('MAIL_PASSWORD'),
                    'mail.mailers.smtp.timeout' => 30,
                    'mail.from.address' => 'contact@grandprixfonij.com',
                    'mail.from.name' => 'Grand Prix FONIJ',
                    // Configuration SSL personnalisée
                    'mail.mailers.smtp.stream' => [
                        'ssl' => [
                            'verify_peer' => false,
                            'verify_peer_name' => false,
                            'allow_self_signed' => true,
                            'local_cert' => $sslCertPath,
                            'local_pk' => $sslKeyPath,
                        ]
                    ]
                ]);
            } else {
                $this->warn('⚠️  Clés SSL locales non trouvées, utilisation du driver LOG');
                config([
                    'mail.default' => 'log',
                    'mail.mailers.log.channel' => 'single',
                ]);
            }
            
            // Envoyer l'email de confirmation avec gestion d'erreur
            $startTime = microtime(true);
            
            // Utiliser un template simplifié pour éviter les problèmes d'image
            Mail::send('emails.test-smtp', [
                'candidateName' => $application->first_name . ' ' . $application->last_name,
                'applicationNumber' => $application->application_number,
                'projectName' => $application->project_name,
                'editionYear' => $application->edition->year,
                'submissionDate' => $application->submitted_at->format('d/m/Y à H:i'),
            ], function ($message) use ($email, $application) {
                $message->to($email)
                        ->subject('Test SMTP - Confirmation de candidature - Grand Prix FONIJ ' . $application->edition->year);
            });
            
            $endTime = microtime(true);
            
            $duration = round(($endTime - $startTime) * 1000, 2);
            
            $this->info('✅ Email de confirmation envoyé avec succès !');
            $this->info("⏱️  Temps d'envoi : {$duration}ms");
            $this->info("📬 Vérifie ta boîte email : {$email}");
            $this->info("📋 Numéro de candidature : {$application->application_number}");
            
        } catch (\Exception $e) {
            $this->error('❌ Erreur lors de l\'envoi :');
            $this->error($e->getMessage());
            
            // Suggestions selon le type d'erreur
            if (strpos($e->getMessage(), '535') !== false) {
                $this->warn('💡 Suggestion : Vérifiez vos identifiants SMTP dans le fichier .env');
            } elseif (strpos($e->getMessage(), 'Connection') !== false) {
                $this->warn('💡 Suggestion : Vérifiez la configuration du serveur SMTP');
            }
        }
    }
}
