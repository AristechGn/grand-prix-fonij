<?php

namespace App\Listeners;

use App\Events\ApplicationSubmitted;
use App\Mail\ApplicationConfirmationMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailer;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendApplicationConfirmationEmail implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Le nombre de tentatives avant échec
     */
    public $tries = 3;

    /**
     * Le délai entre chaque tentative (en secondes)
     */
    public $backoff = [60, 120, 300];

    /**
     * Timeout du job en secondes
     */
    public $timeout = 120;

    /**
     * Create the event listener.
     */
    public function __construct(private Mailer $mailer)
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(ApplicationSubmitted $event): void
    {
        try {
            // Validation des données avant envoi
            if (!$event->application || !$event->application->email) {
                Log::warning('Tentative d\'envoi d\'email sans données valides', [
                    'application_id' => $event->application->id ?? 'N/A'
                ]);
                return;
            }

            Log::info('Envoi d\'email de confirmation', [
                'application_number' => $event->application->application_number,
                'email' => $event->application->email,
                'candidate_name' => $event->application->first_name . ' ' . $event->application->last_name,
            ]);

            // Envoyer l'email de confirmation au candidat
            $this->mailer->send(new ApplicationConfirmationMail($event->application));

            Log::info('Email de confirmation envoyé avec succès', [
                'application_number' => $event->application->application_number,
                'email' => $event->application->email,
                'timestamp' => now()->toDateTimeString()
            ]);

        } catch (\Swift_TransportException $e) {
            Log::error('Erreur de transport SMTP', [
                'application_number' => $event->application->application_number ?? 'N/A',
                'email' => $event->application->email ?? 'N/A',
                'error' => $e->getMessage(),
                'attempt' => $this->attempts()
            ]);

            // Relancer l'exception pour permettre une nouvelle tentative par la queue
            if ($this->attempts() < $this->tries) {
                throw $e;
            }

        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'envoi de l\'email de confirmation', [
                'application_number' => $event->application->application_number ?? 'N/A',
                'email' => $event->application->email ?? 'N/A',
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'file' => $e->getFile(),
                'line' => $e->getLine()
            ]);

            // Relancer pour les erreurs critiques seulement
            if ($this->attempts() < $this->tries) {
                throw $e;
            }
        }
    }

    /**
     * Handle a job failure.
     */
    public function failed(ApplicationSubmitted $event, \Throwable $exception): void
    {
        Log::critical('Échec définitif de l\'envoi d\'email après plusieurs tentatives', [
            'application_number' => $event->application->application_number ?? 'N/A',
            'email' => $event->application->email ?? 'N/A',
            'error' => $exception->getMessage(),
            'attempts' => $this->tries
        ]);

        // Vous pouvez ici notifier un administrateur ou enregistrer l'échec dans la DB
    }
}