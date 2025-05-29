<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreApplicationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ValidationController extends Controller
{
    /**
     * Valide les données d'une étape du formulaire de candidature
     */
    public function validateStep(Request $request)
    {
        $step = $request->input('step');
        $rules = [];
        $messages = [];
        
        // Récupérer les règles de validation de StoreApplicationRequest
        $storeRequest = new StoreApplicationRequest();
        $allRules = $storeRequest->rules();
        $allMessages = $storeRequest->messages();
        
        // Déterminer les règles à appliquer en fonction de l'étape
        switch ($step) {
            case 1: // Catégorie
                $rules = [
                    'categorie' => 'required|exists:categories,id',
                ];
                $messages = [
                    'categorie.required' => 'Veuillez sélectionner une catégorie pour votre projet.',
                    'categorie.exists' => 'La catégorie sélectionnée n\'existe pas.',
                ];
                break;
            case 2: // Informations personnelles
                $rules = [
                    'first_name' => $allRules['first_name'],
                    'last_name' => $allRules['last_name'],
                    'birth_date' => $allRules['birth_date'],
                    'gender' => $allRules['gender'],
                    'email' => $allRules['email'],
                    'phone' => $allRules['phone'],
                    'city' => $allRules['city'],
                    'region' => $allRules['region'],
                    'education_level' => $allRules['education_level'],
                    'profession' => $allRules['profession'],
                ];
                break;
            case 3: // Projet
                $rules = [
                    'project_name' => $allRules['project_name'],
                    'project_summary' => $allRules['project_summary'],
                    'problem_solved' => $allRules['problem_solved'],
                    'expected_impact' => $allRules['expected_impact'],
                    'target_audience' => $allRules['target_audience'],
                    'project_launched' => $allRules['project_launched'],
                    'project_start_date' => $allRules['project_start_date'],
                    'prototype_exists' => $allRules['prototype_exists'],
                ];
                break;
            case 4: // Programme
                $rules = [
                    'program' => $allRules['program'],
                ];
                break;
            default:
                return response()->json(['message' => 'Étape inconnue'], 400);
        }
        
        // Définir tous les messages d'erreur en français
        $messages = [
            // Messages génériques pour toutes les règles
            'required' => 'Le champ :attribute est obligatoire.',
            'string' => 'Le champ :attribute doit être une chaîne de caractères.',
            'email' => 'Le champ :attribute doit être une adresse e-mail valide.',
            'min' => 'Le champ :attribute doit contenir au moins :min caractères.',
            'max' => 'Le champ :attribute ne peut pas dépasser :max caractères.',
            'date' => 'Le champ :attribute doit être une date valide.',
            'numeric' => 'Le champ :attribute doit être un nombre.',
            'integer' => 'Le champ :attribute doit être un nombre entier.',
            'in' => 'La valeur sélectionnée pour :attribute est invalide.',
            'image' => 'Le fichier :attribute doit être une image.',
            'file' => 'Le champ :attribute doit être un fichier.',
            'mimes' => 'Le fichier :attribute doit être de type :values.',
            'size' => 'Le fichier :attribute ne doit pas dépasser :size kilo-octets.',
            'url' => 'Le champ :attribute doit être une URL valide.',
            
            // Messages spécifiques pour les champs
            'category.required' => 'Veuillez sélectionner une catégorie pour votre projet.',
            'edition_id.required' => 'L\'édition est requise.',
            'first_name.required' => 'Veuillez saisir votre prénom.',
            'last_name.required' => 'Veuillez saisir votre nom de famille.',
            'birth_date.required' => 'Veuillez saisir votre date de naissance.',
            'birth_date.date' => 'Le format de la date de naissance est invalide.',
            'gender.required' => 'Veuillez sélectionner votre genre.',
            'gender.in' => 'Le genre sélectionné est invalide.',
            'email.required' => 'Veuillez saisir votre adresse e-mail.',
            'email.email' => 'Veuillez saisir une adresse e-mail valide.',
            'phone.required' => 'Veuillez saisir votre numéro de téléphone.',
            'city.required' => 'Veuillez saisir votre ville.',
            'region.required' => 'Veuillez sélectionner votre région.',
            'education_level.required' => 'Veuillez sélectionner votre niveau d\'études.',
            
            'project_name.required' => 'Veuillez saisir le nom de votre projet.',
            'project_summary.required' => 'Veuillez fournir un résumé de votre projet.',
            'project_summary.min' => 'Le résumé du projet doit contenir au moins :min caractères.',
            'problem_solved.required' => 'Veuillez décrire le problème que résout votre projet.',
            'problem_solved.min' => 'La description du problème résolu doit contenir au moins :min caractères.',
            'expected_impact.required' => 'Veuillez décrire l\'impact attendu de votre projet.',
            'expected_impact.min' => 'La description de l\'impact attendu doit contenir au moins :min caractères.',
            'target_audience.required' => 'Veuillez décrire le public cible de votre projet.',
            'target_audience.min' => 'La description du public cible doit contenir au moins :min caractères.',
            'project_launched.required' => 'Veuillez indiquer si votre projet est déjà lancé.',
            'project_launched.in' => 'La valeur sélectionnée pour le lancement du projet est invalide.',
            'prototype_exists.required' => 'Veuillez indiquer si vous avez déjà un prototype.',
            'prototype_exists.in' => 'La valeur sélectionnée pour l\'existence d\'un prototype est invalide.',
            
            'program.required' => 'Veuillez sélectionner un programme.',
            
            // Documents
            'pieceIdentite.required' => 'Veuillez joindre une pièce d\'identité.',
            'pieceIdentite.file' => 'La pièce d\'identité doit être un fichier.',
            'businessPlan.required' => 'Veuillez joindre un business plan.',
            'businessPlan.file' => 'Le business plan doit être un fichier.',
            'photoProjet.required' => 'Veuillez joindre une photo de votre projet.',
            'photoProjet.image' => 'Le fichier doit être une image.',
            'videoPresentation.url' => 'L\'URL de la vidéo de présentation doit être valide.',
        ];
        
        // Valider les données
        $validator = Validator::make($request->all(), $rules, $messages);
        
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Les données de cette étape contiennent des erreurs',
                'errors' => $validator->errors()
            ], 422);
        }
        
        return response()->json([
            'message' => 'Les données sont valides',
            'validated' => true
        ]);
    }
} 