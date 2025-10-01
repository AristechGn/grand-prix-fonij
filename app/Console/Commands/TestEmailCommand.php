<?php

namespace App\Console\Commands;

use App\Events\ApplicationSubmitted;
use App\Models\Application;
use App\Models\Edition;
use Illuminate\Console\Command;

class TestEmailCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:email {email=aristechdev@gmail.com}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Teste l\'envoi réel d\'email de confirmation de candidature';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        $this->info('🚀 Test d\'envoi d\'email réel...');
        $this->newLine();
        
        try {
            // Créer une édition de test
            $edition = Edition::factory()->create([
                'is_current' => true,
                'status' => 'active',
                'registration_start_date' => now()->subDays(10),
                'registration_deadline' => now()->addDays(10),
                'year' => 2024,
            ]);
            
            $this->info("✅ Édition créée : {$edition->name}");
            
            // Créer une candidature de test
            $application = Application::factory()->create([
                'edition_id' => $edition->id,
                'status' => 'pending',
                'email' => $email,
                'first_name' => 'Jean-Marie',
                'last_name' => 'Gnimassou',
                'project_name' => 'Test Project Event System',
                'submitted_at' => now(),
            ]);
            
            $this->info("✅ Candidature créée : {$application->application_number}");
            $this->info("📧 Email de destination : {$application->email}");
            $this->newLine();
            
            // Déclencher l'événement
            $this->info('🔄 Déclenchement de l\'événement ApplicationSubmitted...');
            ApplicationSubmitted::dispatch($application);
            
            $this->info('✅ Événement déclenché avec succès !');
            $this->info("📬 Vérifie ta boîte email : {$application->email}");
            
        } catch (\Exception $e) {
            $this->error("❌ Erreur : " . $e->getMessage());
            $this->error("📋 Trace : " . $e->getTraceAsString());
        }
    }
}
