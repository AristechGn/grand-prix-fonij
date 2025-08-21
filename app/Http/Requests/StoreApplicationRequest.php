<?php

namespace App\Http\Requests;

use App\Models\Edition;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreApplicationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Tout le monde peut soumettre une candidature
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'edition_id' => 'required|exists:editions,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'birth_date' => 'required|date|before:today|after:1980-01-01',
            'gender' => 'required|string|in:homme,femme,autre',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'education_level' => 'required|string|max:255',
            'profession' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'program' => 'nullable|string|max:255',
            'project_name' => 'required|string|max:255',
            'project_summary' => 'required|string|min:100|max:5000',
            'problem_solved' => 'required|string|min:100|max:5000',
            'expected_impact' => 'required|string|min:100|max:5000',
            'target_audience' => 'required|string|min:50|max:2000',
            'project_launched' => 'required|in:oui,non',
            'project_start_date' => 'nullable|date|required_if:project_launched,oui',
            'prototype_exists' => 'required|in:oui,non',
            'availability_morning' => 'boolean',
            'availability_afternoon' => 'boolean',
            'availability_evening' => 'boolean',
            'pieceIdentite' => 'required|file|mimes:pdf,jpg,jpeg,png|max:5120', // 5MB max
            'businessPlan' => 'required|file|mimes:pdf,doc,docx|max:10240', // 10MB max
            'photoProjet' => 'required|file|mimes:jpg,jpeg,png|max:5120', // 5MB max
            'videoPresentation' => 'nullable|url',
            'certification_accuracy' => 'required|boolean|accepted',
            'free_participation' => 'required|boolean|accepted',
            'communication_authorization' => 'required|boolean|accepted',
        ];
    }

    /**
     * Configurer les messages d'erreur personnalisés.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'edition_id.required' => 'L\'édition est requise.',
            'edition_id.exists' => 'L\'édition sélectionnée n\'existe pas.',
            'first_name.required' => 'Le prénom est requis.',
            'last_name.required' => 'Le nom est requis.',
            'birth_date.required' => 'La date de naissance est requise.',
            'birth_date.before' => 'La date de naissance doit être antérieure à aujourd\'hui.',
            'birth_date.after' => 'Vous devez être né après 1980 pour participer.',
            'gender.required' => 'Le genre est requis.',
            'email.required' => 'L\'adresse email est requise.',
            'email.email' => 'Veuillez fournir une adresse email valide.',
            'phone.required' => 'Le numéro de téléphone est requis.',
            'city.required' => 'La ville est requise.',
            'region.required' => 'La région est requise.',
            'education_level.required' => 'Le niveau d\'études est requis.',
            'profession.required' => 'La profession est requise.',
            'category.required' => 'La catégorie est requise.',
            'project_name.required' => 'Le nom du projet est requis.',
            'project_summary.required' => 'Le résumé du projet est requis.',
            'project_summary.min' => 'Le résumé du projet doit contenir au moins :min caractères.',
            'problem_solved.required' => 'La description du problème résolu est requise.',
            'problem_solved.min' => 'La description du problème doit contenir au moins :min caractères.',
            'expected_impact.required' => 'L\'impact attendu est requis.',
            'expected_impact.min' => 'L\'impact attendu doit contenir au moins :min caractères.',
            'target_audience.required' => 'Le public cible est requis.',
            'target_audience.min' => 'Le public cible doit contenir au moins :min caractères.',
            'project_launched.required' => 'Veuillez indiquer si le projet est déjà lancé.',
            'project_start_date.required_if' => 'La date de début du projet est requise si le projet est déjà lancé.',
            'prototype_exists.required' => 'Veuillez indiquer si un prototype existe.',
            'pieceIdentite.required' => 'Une pièce d\'identité est requise.',
            'pieceIdentite.mimes' => 'La pièce d\'identité doit être au format PDF, JPG ou PNG.',
            'pieceIdentite.max' => 'La pièce d\'identité ne doit pas dépasser 5 Mo.',
            'businessPlan.required' => 'Un business plan est requis.',
            'businessPlan.mimes' => 'Le business plan doit être au format PDF, DOC ou DOCX.',
            'businessPlan.max' => 'Le business plan ne doit pas dépasser 10 Mo.',
            'photoProjet.required' => 'Une photo du projet est requise.',
            'photoProjet.mimes' => 'La photo du projet doit être au format JPG ou PNG.',
            'photoProjet.max' => 'La photo du projet ne doit pas dépasser 5 Mo.',
            'videoPresentation.url' => 'L\'URL de la vidéo de présentation doit être valide.',
            'certification_accuracy.accepted' => 'Vous devez certifier l\'exactitude des informations fournies.',
            'free_participation.accepted' => 'Vous devez accepter la participation gratuite.',
            'communication_authorization.accepted' => 'Vous devez autoriser la communication sur votre projet.',
        ];
    }

    /**
     * Préparer les données pour la validation.
     */
    protected function prepareForValidation(): void
    {
        // Convertir les valeurs de type checkbox en booléens
        $this->merge([
            'availability_morning' => $this->boolean('availability_morning'),
            'availability_afternoon' => $this->boolean('availability_afternoon'),
            'availability_evening' => $this->boolean('availability_evening'),
            'certification_accuracy' => $this->boolean('certification_accuracy'),
            'free_participation' => $this->boolean('free_participation'),
            'communication_authorization' => $this->boolean('communication_authorization'),
        ]);
    }

    /**
     * Validation après les règles de base.
     *
     * @param \Illuminate\Validation\Validator $validator
     */
    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // Vérifier si les inscriptions sont ouvertes pour cette édition
            if ($this->has('edition_id')) {
                $edition = Edition::find($this->input('edition_id'));
                
                if ($edition) {
                    $now = now();
                    
                    // Vérifier les dates d'inscription
                    if ($edition->registration_start_date && $now->lt($edition->registration_start_date)) {
                        $validator->errors()->add('edition_id', 'Les inscriptions pour cette édition ne sont pas encore ouvertes.');
                    }
                    
                    if ($edition->registration_deadline && $now->gt($edition->registration_deadline)) {
                        $validator->errors()->add('edition_id', 'Les inscriptions pour cette édition sont terminées.');
                    }
                    
                    // Vérifier si le nombre maximum de participants est atteint
                    if ($edition->max_participants > 0) {
                        $currentCount = $edition->applications()->count();
                        if ($currentCount >= $edition->max_participants) {
                            $validator->errors()->add('edition_id', 'Le nombre maximum de participants pour cette édition a été atteint.');
                        }
                    }
                }
            }
            
            // Vérifier l'âge (entre 18 et 35 ans)
            if ($this->has('birth_date')) {
                $birthDate = new \DateTime($this->input('birth_date'));
                $today = new \DateTime();
                $age = $birthDate->diff($today)->y;
                
                if ($age < 18 || $age > 35) {
                    $validator->errors()->add('birth_date', 'Vous devez avoir entre 18 et 35 ans pour participer.');
                }
            }
        });
    }
}
