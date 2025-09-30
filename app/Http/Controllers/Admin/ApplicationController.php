<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Edition;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ApplicationController extends Controller
{
    /**
     * Affiche la liste des candidatures.
     */
    public function index(Request $request)
    {
        $query = Application::query()
            ->with('edition')
            ->orderByDesc('submitted_at');
            
        // Filtrer par édition
        if ($request->has('edition_id') && $request->edition_id) {
            $query->where('edition_id', $request->edition_id);
        }
        
        // Filtrer par statut
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }
        
        // Filtrer par catégorie
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }
        
        // Recherche par nom, email ou numéro de candidature
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('application_number', 'like', "%{$search}%")
                  ->orWhere('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('project_name', 'like', "%{$search}%");
            });
        }
        
        $applications = $query->paginate(15)
            ->withQueryString();
            
        $editions = Edition::orderByDesc('year')->get();
        
        $applicationStatuses = [
            'pending' => 'En attente',
            'validated' => 'Validée',
            'rejected' => 'Rejetée',
            'selected' => 'Sélectionnée',
            'finalist' => 'Finaliste',
            'winner' => 'Lauréat'
        ];
        
        return Inertia::render('Admin/Applications/Index', [
            'applications' => $applications,
            'editions' => $editions,
            'filters' => $request->only(['search', 'edition_id', 'status', 'category']),
            'statuses' => $applicationStatuses
        ]);
    }

    /**
     * Affiche le détail d'une candidature.
     */
    public function show(Application $application)
    {
        $application->load('edition', 'user', 'reviewer');
        
        return Inertia::render('Admin/Applications/Show', [
            'application' => $application
        ]);
    }

    /**
     * Affiche le formulaire de modification d'une candidature.
     */
    public function edit(Application $application)
    {
        $application->load('edition');
        
        $applicationStatuses = [
            'pending' => 'En attente',
            'validated' => 'Validée',
            'rejected' => 'Rejetée',
            'selected' => 'Sélectionnée',
            'finalist' => 'Finaliste',
            'winner' => 'Lauréat'
        ];
        
        return Inertia::render('Admin/Applications/Edit', [
            'application' => $application,
            'statuses' => $applicationStatuses
        ]);
    }

    /**
     * Met à jour une candidature.
     */
    public function update(Request $request, Application $application)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,validated,rejected,selected,finalist,winner',
            'score' => 'nullable|integer|min:0|max:100',
            'evaluation_notes' => 'nullable|string',
            'jury_scores' => 'nullable|array',
        ]);
        
        $application->update([
            'status' => $validated['status'],
            'score' => $validated['score'],
            'evaluation_notes' => $validated['evaluation_notes'],
            'jury_scores' => $validated['jury_scores'],
            'reviewed_at' => now(),
            'reviewed_by' => auth()->id(),
        ]);
        
        return redirect()->route('admin.applications.show', $application)
            ->with('success', 'Candidature mise à jour avec succès.');
    }

    /**
     * Télécharger un document de candidature.
     */
    public function downloadDocument(Application $application, string $document)
    {
        $allowedDocuments = ['id_document', 'business_plan', 'project_photo'];
        
        if (!in_array($document, $allowedDocuments)) {
            abort(404);
        }
        
        $documentPath = $application->{$document . '_path'};
        
        if (!$documentPath || !Storage::disk('public')->exists($documentPath)) {
            abort(404, 'Document introuvable');
        }
        
        return Storage::disk('public')->download($documentPath);
    }

    /**
     * Exporter les candidatures au format CSV.
     */
    public function export(Request $request)
    {
        $query = Application::query()
            ->with('edition')
            ->orderByDesc('submitted_at');
            
        // Appliquer les mêmes filtres que pour l'index
        if ($request->has('edition_id') && $request->edition_id) {
            $query->where('edition_id', $request->edition_id);
        }
        
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }
        
        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }
        
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('application_number', 'like', "%{$search}%")
                  ->orWhere('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%")
                  ->orWhere('project_name', 'like', "%{$search}%");
            });
        }
        
        $applications = $query->get();
        
        $headers = [
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=candidatures.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        ];
        
        $columns = [
            'Numéro', 'Nom', 'Prénom', 'Email', 'Téléphone', 
            'Projet', 'Catégorie', 'Statut', 'Score', 'Date de soumission'
        ];
        
        $callback = function() use ($applications, $columns) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);
            
            foreach ($applications as $application) {
                fputcsv($file, [
                    $application->application_number,
                    $application->last_name,
                    $application->first_name,
                    $application->email,
                    $application->phone,
                    $application->project_name,
                    $application->category,
                    $application->status,
                    $application->score,
                    $application->submitted_at ? $application->submitted_at->format('d/m/Y H:i') : '-'
                ]);
            }
            
            fclose($file);
        };
        
        return response()->stream($callback, 200, $headers);
    }

    /**
     * Affiche la liste des candidatures groupées par édition.
     */
    public function byEdition()
    {
        $editions = Edition::withCount('applications')
            ->orderByDesc('year')
            ->get();
            
        return Inertia::render('Admin/Applications/ByEdition', [
            'editions' => $editions
        ]);
    }

    /**
     * Affiche les candidatures d'une édition spécifique.
     */
    public function byEditionShow(Edition $edition)
    {
        $applications = $edition->applications()
            ->orderByDesc('submitted_at')
            ->paginate(15);
            
        $applicationStatuses = [
            'pending' => 'En attente',
            'validated' => 'Validée',
            'rejected' => 'Rejetée',
            'selected' => 'Sélectionnée',
            'finalist' => 'Finaliste',
            'winner' => 'Lauréat'
        ];
        
        return Inertia::render('Admin/Applications/ByEditionShow', [
            'edition' => $edition,
            'applications' => $applications,
            'statuses' => $applicationStatuses
        ]);
    }

    /**
     * Supprimer une candidature.
     */
    public function destroy(Application $application)
    {
        // Supprimer les fichiers associés
        if ($application->id_document_path) {
            Storage::disk('public')->delete($application->id_document_path);
        }
        
        if ($application->business_plan_path) {
            Storage::disk('public')->delete($application->business_plan_path);
        }
        
        if ($application->project_photo_path) {
            Storage::disk('public')->delete($application->project_photo_path);
        }
        
        $application->delete();
        
        return redirect()->route('admin.applications.index')
            ->with('success', 'Candidature supprimée avec succès.');
    }
}
