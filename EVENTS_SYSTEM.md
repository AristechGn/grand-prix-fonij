# Système d'événements pour les candidatures

## Vue d'ensemble

Ce système d'événements Laravel permet de gérer automatiquement les actions qui se déclenchent après chaque soumission de candidature au Grand Prix FONIJ.

## Architecture

### 1. Événement : `ApplicationSubmitted`

**Fichier :** `app/Events/ApplicationSubmitted.php`

Cet événement est déclenché chaque fois qu'une candidature est soumise avec succès. Il contient :
- L'objet `Application` complet
- Toutes les données de la candidature
- Les informations de l'édition

### 2. Listeners (Écouteurs)

#### `SendApplicationConfirmationEmail`
**Fichier :** `app/Listeners/SendApplicationConfirmationEmail.php`

**Fonction :** Envoie un email de confirmation au candidat
- Utilise la classe `ApplicationConfirmationMail`
- Gère les erreurs d'envoi avec logging
- Implémente `ShouldQueue` pour traitement asynchrone

#### `NotifyAdminsNewApplication`
**Fichier :** `app/Listeners/NotifyAdminsNewApplication.php`

**Fonction :** Notifie les administrateurs de la nouvelle candidature
- Log les informations de la candidature
- Prêt pour extensions futures (notifications, intégrations CRM, etc.)

### 3. Email de confirmation

**Fichier :** `app/Mail/ApplicationConfirmationMail.php`
**Template :** `resources/views/emails/application-confirmation.blade.php`

Email HTML professionnel contenant :
- Confirmation de réception
- Numéro de candidature
- Détails du projet
- Prochaines étapes
- Informations de contact

## Configuration

### EventServiceProvider
**Fichier :** `app/Providers/EventServiceProvider.php`

Enregistre les mappings événement → listeners :
```php
protected $listen = [
    ApplicationSubmitted::class => [
        SendApplicationConfirmationEmail::class,
        NotifyAdminsNewApplication::class,
    ],
];
```

### Déclenchement dans le contrôleur
**Fichier :** `app/Http/Controllers/ApplicationController.php`

L'événement est déclenché après la sauvegarde de la candidature :
```php
$application->save();

// Déclencher l'événement de candidature soumise
ApplicationSubmitted::dispatch($application);
```

## Avantages du système

1. **Découplage :** Les actions post-soumission sont séparées de la logique métier principale
2. **Extensibilité :** Facile d'ajouter de nouveaux listeners pour de nouvelles fonctionnalités
3. **Fiabilité :** Gestion d'erreurs indépendante pour chaque action
4. **Performance :** Traitement asynchrone avec les queues
5. **Testabilité :** Chaque composant peut être testé indépendamment

## Extensions possibles

### Nouveaux listeners à ajouter :

1. **`UpdateApplicationStatistics`**
   - Mettre à jour les statistiques en temps réel
   - Compter les candidatures par catégorie/région

2. **`CreateFollowUpTask`**
   - Créer automatiquement des tâches de suivi
   - Programmer des rappels pour l'équipe

3. **`SyncWithCRM`**
   - Synchroniser avec un système CRM externe
   - Envoyer les données à des partenaires

4. **`SendSMSNotification`**
   - Envoyer une notification SMS au candidat
   - Notifier les administrateurs par SMS

5. **`GenerateApplicationPDF`**
   - Générer un PDF de la candidature
   - Stocker les documents dans un système externe

## Tests

**Fichier :** `tests/Feature/ApplicationEventTest.php`

Tests disponibles :
- Vérification du déclenchement de l'événement
- Vérification de l'envoi de l'email de confirmation

## Utilisation

Le système fonctionne automatiquement. Chaque fois qu'une candidature est soumise via le formulaire, les actions suivantes se déclenchent :

1. ✅ Sauvegarde de la candidature
2. ✅ Déclenchement de l'événement `ApplicationSubmitted`
3. ✅ Envoi de l'email de confirmation au candidat
4. ✅ Log de la nouvelle candidature pour les administrateurs
5. ✅ Retour de la réponse JSON au frontend

## Monitoring

Les logs sont disponibles dans `storage/logs/laravel.log` :
- Succès d'envoi d'emails
- Erreurs d'envoi d'emails
- Informations sur les nouvelles candidatures
- Erreurs des listeners

## Configuration des queues

Pour un traitement optimal, configurez les queues Laravel :
```bash
php artisan queue:work
```

Les listeners implémentant `ShouldQueue` seront traités de manière asynchrone.
