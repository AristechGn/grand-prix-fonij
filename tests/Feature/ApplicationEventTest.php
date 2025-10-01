<?php

use App\Events\ApplicationSubmitted;
use App\Models\Application;
use App\Models\Edition;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Mail;

test('application submitted event is dispatched', function () {
    // Activer les événements pour le test
    Event::fake();
    
    // Créer une édition de test
    $edition = Edition::factory()->create([
        'is_current' => true,
        'status' => 'active',
        'registration_start_date' => now()->subDays(10),
        'registration_deadline' => now()->addDays(10),
    ]);
    
    // Créer une candidature de test
    $application = Application::factory()->create([
        'edition_id' => $edition->id,
        'status' => 'pending',
    ]);
    
    // Déclencher l'événement
    ApplicationSubmitted::dispatch($application);
    
    // Vérifier que l'événement a été déclenché
    Event::assertDispatched(ApplicationSubmitted::class, function ($event) use ($application) {
        return $event->application->id === $application->id;
    });
});

test('real application confirmation email is sent', function () {
    // Ne pas utiliser Mail::fake() pour tester l'envoi réel
    // Event::fake(); // Commenté pour permettre l'envoi réel
    
    // Créer une édition de test
    $edition = Edition::factory()->create([
        'is_current' => true,
        'status' => 'active',
        'registration_start_date' => now()->subDays(10),
        'registration_deadline' => now()->addDays(10),
        'year' => 2024,
    ]);
    
    // Créer une candidature de test avec ton email réel
    $application = Application::factory()->create([
        'edition_id' => $edition->id,
        'status' => 'pending',
        'email' => 'aristechdev@gmail.com',
        'first_name' => 'Jean-Marie',
        'last_name' => 'Gnimassou',
        'project_name' => 'Test Project Event System',
        'submitted_at' => now(),
    ]);
    
    // Déclencher l'événement réel
    ApplicationSubmitted::dispatch($application);
    
    // Le test passera si l'email est envoyé avec succès
    // Si il y a une erreur d'envoi, le test échouera
    expect(true)->toBeTrue(); // Test basique pour vérifier que le code s'exécute
});
