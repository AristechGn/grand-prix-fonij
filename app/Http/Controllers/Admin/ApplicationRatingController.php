<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationRatingController extends Controller
{
    /**
     * Évalue une candidature ou met à jour une évaluation existante.
     */
    public function rate(Request $request, Application $application)
    {
        // Vérifier que l'utilisateur est un membre du jury ou un admin
        if (!Auth::user()->hasRole(['jury', 'admin'])) {
            return response()->json([
                'success' => false,
                'message' => 'Vous n\'êtes pas autorisé à évaluer cette candidature.'
            ], 403);
        }
        
        $validated = $request->validate([
            'score' => 'required|integer|min:0|max:100',
            'criteria' => 'required|array',
            'notes' => 'nullable|string',
        ]);
        
        $userId = Auth::id();
        
        // Récupérer les évaluations actuelles
        $juryScores = $application->jury_scores ?? [];
        
        // Ajouter ou mettre à jour l'évaluation de cet utilisateur
        $juryScores[$userId] = [
            'user_id' => $userId,
            'score' => $validated['score'],
            'criteria' => $validated['criteria'],
            'notes' => $validated['notes'] ?? '',
            'rated_at' => now()->toIso8601String(),
        ];
        
        // Mettre à jour l'application avec les nouvelles évaluations
        $application->jury_scores = $juryScores;
        
        // Calculer le score moyen si plusieurs évaluations existent
        if (count($juryScores) > 0) {
            $totalScore = 0;
            foreach ($juryScores as $juryScore) {
                $totalScore += $juryScore['score'];
            }
            $application->score = round($totalScore / count($juryScores));
        } else {
            $application->score = $validated['score'];
        }
        
        $application->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Évaluation enregistrée avec succès',
            'application' => $application
        ]);
    }
    
    /**
     * Récupère l'évaluation d'un utilisateur pour une candidature.
     */
    public function getUserRating(Application $application)
    {
        $userId = Auth::id();
        $juryScores = $application->jury_scores ?? [];
        
        $rating = $juryScores[$userId] ?? null;
        
        return response()->json([
            'success' => true,
            'rating' => $rating
        ]);
    }
    
    /**
     * Récupère toutes les évaluations pour une candidature.
     */
    public function getAllRatings(Application $application)
    {
        // Vérifier que l'utilisateur est un admin
        if (!Auth::user()->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Vous n\'êtes pas autorisé à voir toutes les évaluations.'
            ], 403);
        }
        
        return response()->json([
            'success' => true,
            'ratings' => $application->jury_scores ?? []
        ]);
    }
}
