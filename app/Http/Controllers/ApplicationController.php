<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Edition;
use App\Traits\HasSEO;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Http\Requests\StoreApplicationRequest;

class ApplicationController extends Controller
{
    use HasSEO;
    /**
     * Affiche le formulaire de candidature.
     */
    public function create()
    {
        $seoData = $this->setApplicationSEO();
        
        // Obtenir l'édition actuelle
        $edition = Edition::where('is_current', true)
            ->where('status', 'active')
            ->first();
        
        // Vérifier si les inscriptions sont ouvertes
        $isOpenForRegistration = false;
        $registrationMessage = "Les inscriptions ne sont pas encore ouvertes.";
        
        if ($edition) {
            $now = now();
            
            if ($edition->registration_start_date && $edition->registration_deadline) {
                if ($now->between($edition->registration_start_date, $edition->registration_deadline)) {
                    $isOpenForRegistration = true;
                    $registrationMessage = "Les inscriptions sont ouvertes jusqu'au " . $edition->registration_deadline->format('d/m/Y');
                } elseif ($now->lt($edition->registration_start_date)) {
                    $registrationMessage = "Les inscriptions ouvriront le " . $edition->registration_start_date->format('d/m/Y');
                } elseif ($now->gt($edition->registration_deadline)) {
                    $registrationMessage = "Les inscriptions sont terminées depuis le " . $edition->registration_deadline->format('d/m/Y');
                }
            }
            
            // Vérifier le nombre de participants max
            if ($isOpenForRegistration && $edition->max_participants > 0) {
                $currentApplicationsCount = Application::where('edition_id', $edition->id)->count();
                
                if ($currentApplicationsCount >= $edition->max_participants) {
                    $isOpenForRegistration = false;
                    $registrationMessage = "Le nombre maximum de participants a été atteint.";
                }
            }
        }
        
        return Inertia::render('Candidater', array_merge([
            'edition' => $edition,
            'isOpenForRegistration' => $isOpenForRegistration,
            'registrationMessage' => $registrationMessage
        ], $seoData));
    }

    /**
     * Enregistre une nouvelle candidature.
     */
    public function store(StoreApplicationRequest $request)
    {
        // Les données sont déjà validées par StoreApplicationRequest
        $validated = $request->validated();
        
        // Générer un numéro de candidature unique
        $applicationNumber = Application::generateApplicationNumber();
        
        // Calculer l'âge
        $birthDate = new \DateTime($validated['birth_date']);
        $today = new \DateTime();
        $age = $birthDate->diff($today)->y;
        
        // Traiter et stocker les fichiers
        $idDocumentPath = $request->file('pieceIdentite')->store('applications/id_documents', 'public');
        $businessPlanPath = $request->file('businessPlan')->store('applications/business_plans', 'public');
        $projectPhotoPath = $request->file('photoProjet')->store('applications/project_photos', 'public');
        
        // Créer la candidature
        $application = new Application([
            'edition_id' => $validated['edition_id'],
            'user_id' => auth()->id(), // Si l'utilisateur est connecté
            'application_number' => $applicationNumber,
            'status' => 'pending',
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'birth_date' => $validated['birth_date'],
            'age' => $age,
            'gender' => $validated['gender'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'city' => $validated['city'],
            'region' => $validated['region'],
            'education_level' => $validated['education_level'],
            'profession' => $validated['profession'],
            'category' => $validated['category'],
            'program' => $validated['program'] ?? null,
            'project_name' => $validated['project_name'],
            'project_summary' => $validated['project_summary'],
            'problem_solved' => $validated['problem_solved'],
            'expected_impact' => $validated['expected_impact'],
            'target_audience' => $validated['target_audience'],
            'project_launched' => $validated['project_launched'],
            'project_start_date' => $validated['project_start_date'] ?? null,
            'prototype_exists' => $validated['prototype_exists'],
            'availability_morning' => $validated['availability_morning'] ?? false,
            'availability_afternoon' => $validated['availability_afternoon'] ?? false,
            'availability_evening' => $validated['availability_evening'] ?? false,
            'id_document_path' => $idDocumentPath,
            'business_plan_path' => $businessPlanPath,
            'project_photo_path' => $projectPhotoPath,
            'presentation_video_url' => $validated['videoPresentation'] ?? null,
            'certification_accuracy' => true,
            'free_participation' => true,
            'communication_authorization' => true,
            'submitted_at' => now(),
        ]);
        
        $application->save();
        
        // Envoyer une notification ou un email au candidat
        // TODO: Implémenter la notification
        
        return response()->json([
            'success' => true,
            'message' => 'Votre candidature a été soumise avec succès!',
            'application_number' => $applicationNumber,
            'redirect_url' => route('candidature.confirmation', $applicationNumber)
        ], 201);
    }

    /**
     * Affiche la page de confirmation après soumission.
     */
    public function confirmation($applicationNumber)
    {
        $application = Application::where('application_number', $applicationNumber)->firstOrFail();
        
        return Inertia::render('ApplicationConfirmation', [
            'application' => $application
        ]);
    }

    /**
     * Permet à un utilisateur de consulter sa candidature.
     */
    public function show($applicationNumber)
    {
        $application = Application::where('application_number', $applicationNumber)
            ->when(auth()->check() && !auth()->user()->isAdmin(), function ($query) {
                return $query->where('email', auth()->user()->email)
                            ->orWhere('user_id', auth()->id());
            })
            ->firstOrFail();
        
        return Inertia::render('ApplicationDetail', [
            'application' => $application
        ]);
    }
}
