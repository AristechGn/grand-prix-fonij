<?php

namespace App\Listeners;

use App\Events\ApplicationSubmitted;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class NotifyAdminsNewApplication implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ApplicationSubmitted $event): void
    {
        try {
            // Log de la nouvelle candidature pour les administrateurs
            Log::info('Nouvelle candidature reçue', [
                'application_number' => $event->application->application_number,
                'candidate_name' => $event->application->first_name . ' ' . $event->application->last_name,
                'project_name' => $event->application->project_name,
                'category' => $event->application->category,
                'submitted_at' => $event->application->submitted_at,
            ]);

            // TODO: Ajouter d'autres actions ici selon les besoins futurs :
            // - Envoyer une notification aux administrateurs
            // - Créer une tâche de suivi automatique
            // - Mettre à jour des statistiques en temps réel
            // - Intégrer avec des systèmes externes (CRM, etc.)
            
        } catch (\Exception $e) {
            Log::error('Erreur lors de la notification des administrateurs', [
                'application_number' => $event->application->application_number,
                'error' => $e->getMessage()
            ]);
            
            // Ne pas relancer l'exception pour éviter d'interrompre le processus principal
        }
    }
}
