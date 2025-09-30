<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Edition;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Worksheet\AutoFilter;

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
     * Exporter les candidatures au format Excel.
     */
    public function export(Request $request)
    {
        $query = Application::query()
            ->with(['edition', 'reviewer'])
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
        
        // Filtrer par score minimum
        if ($request->has('score_min') && $request->score_min) {
            $query->where('score', '>=', $request->score_min);
        }
        
        // Filtrer par score maximum
        if ($request->has('score_max') && $request->score_max) {
            $query->where('score', '<=', $request->score_max);
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
        
        // Générer le nom du fichier avec les filtres appliqués
        $editionName = $applications->first()?->edition?->name ?? 'toutes-editions';
        $editionName = str_replace([' ', '/', '\\'], '-', strtolower($editionName));
        $filename = "candidatures_{$editionName}_" . now()->format('Y-m-d_H-i-s') . '.xlsx';
        
        // Mapping des statuts
        $statusLabels = [
            'pending' => 'En attente',
            'validated' => 'Validée',
            'rejected' => 'Rejetée',
            'selected' => 'Sélectionnée',
            'finalist' => 'Finaliste',
            'winner' => 'Lauréat'
        ];
        
        // Mapping des catégories avec couleurs
        $categoryLabels = [
            1 => [
                'name' => "Promotion de l'esprit d'entreprise",
                'color' => 'FFE5B4' // Pêche
            ],
            2 => [
                'name' => "Éducation aux compétences entrepreneuriales",
                'color' => 'B0E0E6' // Poudre bleue
            ],
            3 => [
                'name' => "Transition numérique",
                'color' => 'DDA0DD' // Prune
            ],
            4 => [
                'name' => "Entrepreneuriat agricole durable",
                'color' => '98FB98' // Vert pâle
            ],
            5 => [
                'name' => "Grand prix du jury (initiative la plus créative)",
                'color' => 'FFB6C1' // Rose clair
            ]
        ];
        
        // Créer un nouveau spreadsheet
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('Candidatures');
        
        // Définir les en-têtes (champs essentiels seulement)
        $headers = [
            'A1' => 'Numéro de candidature',
            'B1' => 'Nom',
            'C1' => 'Prénom',
            'D1' => 'Email',
            'E1' => 'Téléphone',
            'F1' => 'Nom du projet',
            'G1' => 'Catégorie',
            'H1' => 'Statut',
            'I1' => 'Score',
            'J1' => 'Date de soumission'
        ];
        
        // Remplir les en-têtes
        foreach ($headers as $cell => $value) {
            $sheet->setCellValue($cell, $value);
        }
        
        // Style des en-têtes
        $headerStyle = [
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF']
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '016f10']
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000']
                ]
            ]
        ];
        
        $sheet->getStyle('A1:J1')->applyFromArray($headerStyle);
        
        // Ajouter le filtre automatique
        $sheet->setAutoFilter('A1:J1');
        
        // Remplir les données
        $row = 2;
        foreach ($applications as $application) {
            $sheet->setCellValue('A' . $row, (string) $application->application_number);
            $sheet->setCellValue('B' . $row, (string) $application->last_name);
            $sheet->setCellValue('C' . $row, (string) $application->first_name);
            $sheet->setCellValue('D' . $row, (string) $application->email);
            $sheet->setCellValue('E' . $row, (string) $application->phone);
            $sheet->setCellValue('F' . $row, (string) $application->project_name);
            // Catégorie avec couleur
            $categoryInfo = $categoryLabels[$application->category] ?? null;
            $categoryName = $categoryInfo ? $categoryInfo['name'] : "Catégorie {$application->category}";
            $sheet->setCellValue('G' . $row, (string) $categoryName);
            
            // Appliquer la couleur de la catégorie
            if ($categoryInfo && isset($categoryInfo['color'])) {
                $sheet->getStyle('G' . $row)->getFill()
                    ->setFillType(Fill::FILL_SOLID)
                    ->getStartColor()->setRGB($categoryInfo['color']);
            }
            $sheet->setCellValue('H' . $row, (string) ($statusLabels[$application->status] ?? $application->status));
            $sheet->setCellValue('I' . $row, $application->score ? (string) ($application->score . '/100') : '-');
            $sheet->setCellValue('J' . $row, $application->submitted_at ? $application->submitted_at->format('d/m/Y H:i') : '-');
            $row++;
        }
        
        // Style des données
        $dataStyle = [
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => 'CCCCCC']
                ]
            ],
            'alignment' => [
                'vertical' => Alignment::VERTICAL_CENTER
            ]
        ];
        
        if ($row > 2) {
            $sheet->getStyle('A2:J' . ($row - 1))->applyFromArray($dataStyle);
        }
        
        // Ajuster la largeur des colonnes
        $sheet->getColumnDimension('A')->setWidth(20);
        $sheet->getColumnDimension('B')->setWidth(15);
        $sheet->getColumnDimension('C')->setWidth(15);
        $sheet->getColumnDimension('D')->setWidth(25);
        $sheet->getColumnDimension('E')->setWidth(15);
        $sheet->getColumnDimension('F')->setWidth(30);
        $sheet->getColumnDimension('G')->setWidth(35);
        $sheet->getColumnDimension('H')->setWidth(15);
        $sheet->getColumnDimension('I')->setWidth(10);
        $sheet->getColumnDimension('J')->setWidth(18);
        
        // Créer le writer
        $writer = new Xlsx($spreadsheet);
        
        // Générer le fichier en mémoire
        $tempFile = tempnam(sys_get_temp_dir(), 'candidatures_');
        $writer->save($tempFile);
        
        // Retourner le fichier
        return response()->download($tempFile, $filename, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'Pragma' => 'no-cache',
            'Expires' => '0',
        ])->deleteFileAfterSend(true);
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
    public function byEditionShow(Request $request, Edition $edition)
    {
        $query = $edition->applications();
        
        // Filtres
        if ($request->filled('search')) {
            $search = $request->get('search');
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('project_name', 'like', "%{$search}%")
                  ->orWhere('application_number', 'like', "%{$search}%");
            });
        }
        
        if ($request->filled('status') && $request->get('status') !== 'all') {
            $query->where('status', $request->get('status'));
        }
        
        if ($request->filled('category') && $request->get('category') !== 'all') {
            $query->where('category', (int)$request->get('category'));
        }
        
        if ($request->filled('score_min')) {
            $query->where('score', '>=', $request->get('score_min'));
        }
        
        if ($request->filled('score_max')) {
            $query->where('score', '<=', $request->get('score_max'));
        }
        
        $applications = $query->orderByDesc('submitted_at')->paginate(15);
        
        $applicationStatuses = [
            'pending' => 'En attente',
            'validated' => 'Validée',
            'rejected' => 'Rejetée',
            'selected' => 'Sélectionnée',
            'finalist' => 'Finaliste',
            'winner' => 'Lauréat'
        ];
        
        // Récupérer les IDs des catégories uniques pour les filtres
        $categories = $edition->applications()
            ->select('category')
            ->distinct()
            ->whereNotNull('category')
            ->where('category', '!=', '')
            ->pluck('category')
            ->map(function($category) {
                // Convertir en entier si c'est une chaîne numérique
                return is_numeric($category) ? (int)$category : $category;
            })
            ->filter(function($category) {
                // Filtrer les valeurs vides et s'assurer que c'est un entier valide
                return is_numeric($category) && $category > 0 && $category <= 5;
            })
            ->values()
            ->toArray();
        
        return Inertia::render('Admin/Applications/ByEditionShow', [
            'edition' => $edition,
            'applications' => $applications,
            'statuses' => $applicationStatuses,
            'categories' => $categories,
            'filters' => $request->only(['search', 'status', 'category', 'score_min', 'score_max'])
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
        
        $editionId = $application->edition_id;
        $application->delete();
        
        // Rediriger vers la page de l'édition si on vient de ByEditionShow
        if (request()->header('Referer') && str_contains(request()->header('Referer'), 'by-edition')) {
            return redirect()->route('admin.applications.by-edition.show', $editionId)
                ->with('success', 'Candidature supprimée avec succès.');
        }
        
        return redirect()->route('admin.applications.index')
            ->with('success', 'Candidature supprimée avec succès.');
    }
}
