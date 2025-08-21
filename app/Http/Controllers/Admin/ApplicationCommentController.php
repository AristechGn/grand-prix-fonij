<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\ApplicationComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationCommentController extends Controller
{
    /**
     * Enregistre un nouveau commentaire sur une candidature.
     */
    public function store(Request $request, Application $application)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'is_private' => 'boolean',
            'is_note' => 'boolean',
        ]);
        
        $comment = new ApplicationComment([
            'application_id' => $application->id,
            'user_id' => Auth::id(),
            'content' => $validated['content'],
            'is_private' => $validated['is_private'] ?? false,
            'is_note' => $validated['is_note'] ?? false,
        ]);
        
        $comment->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Commentaire ajouté avec succès',
            'comment' => $comment->load('user')
        ]);
    }
    
    /**
     * Met à jour un commentaire.
     */
    public function update(Request $request, ApplicationComment $comment)
    {
        // Vérifier que l'utilisateur est autorisé à modifier ce commentaire
        if ($comment->user_id !== Auth::id() && !Auth::user()->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Vous n\'êtes pas autorisé à modifier ce commentaire.'
            ], 403);
        }
        
        $validated = $request->validate([
            'content' => 'required|string',
            'is_private' => 'boolean',
            'is_note' => 'boolean',
        ]);
        
        $comment->update([
            'content' => $validated['content'],
            'is_private' => $validated['is_private'] ?? $comment->is_private,
            'is_note' => $validated['is_note'] ?? $comment->is_note,
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Commentaire mis à jour avec succès',
            'comment' => $comment->fresh(['user'])
        ]);
    }
    
    /**
     * Supprime un commentaire.
     */
    public function destroy(ApplicationComment $comment)
    {
        // Vérifier que l'utilisateur est autorisé à supprimer ce commentaire
        if ($comment->user_id !== Auth::id() && !Auth::user()->hasRole('admin')) {
            return response()->json([
                'success' => false,
                'message' => 'Vous n\'êtes pas autorisé à supprimer ce commentaire.'
            ], 403);
        }
        
        $comment->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Commentaire supprimé avec succès'
        ]);
    }
    
    /**
     * Liste les commentaires d'une candidature.
     */
    public function index(Application $application)
    {
        $comments = $application->comments()
            ->with('user')
            ->when(!Auth::user()->hasRole('admin'), function ($query) {
                // Masquer les commentaires privés pour les non-admin
                return $query->where('is_private', false);
            })
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json([
            'success' => true,
            'comments' => $comments
        ]);
    }
}
