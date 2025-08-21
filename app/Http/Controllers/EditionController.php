<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use App\Models\Phase;
use App\Models\Prize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EditionController extends Controller
{
    /**
     * Display a listing of the editions.
     */
    public function index()
    {
        $editions = Edition::withCount(['phases', 'prizes', 'participants'])
                        ->orderByDesc('year')
                        ->paginate(10);
        
        return Inertia::render('Admin/Editions/Index', [
            'editions' => $editions
        ]);
    }

    /**
     * Show the form for creating a new edition.
     */
    public function create()
    {
        return Inertia::render('Admin/Editions/Create');
    }

    /**
     * Store a newly created edition in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:2100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:start_date',
            'registration_start_date' => 'nullable|date|before_or_equal:registration_deadline',
            'registration_deadline' => 'nullable|date|before:end_date',
            'max_participants' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'status' => 'required|string|in:draft,published,active,completed,archived',
            'is_current' => 'boolean',
        ]);

        DB::transaction(function () use ($validated) {
            // If setting as current, unset all others
            if ($validated['is_current'] ?? false) {
                Edition::where('is_current', true)->update(['is_current' => false]);
            }
            
            $edition = Edition::create($validated);
            
            // Create default phases if this is a new edition
            if ($edition) {
                $this->createDefaultPhases($edition);
            }
        });

        return redirect()->route('admin.editions.index')
                        ->with('success', 'Édition créée avec succès.');
    }

    /**
     * Display the specified edition.
     */
    public function show(Edition $edition)
    {
        $edition->load(['phases' => function ($query) {
            $query->orderBy('order');
        }, 'prizes' => function ($query) {
            $query->orderBy('rank');
        }]);
        
        $edition->loadCount('participants');
        
        return Inertia::render('Admin/Editions/Show', [
            'edition' => $edition
        ]);
    }

    /**
     * Show the form for editing the specified edition.
     */
    public function edit(Edition $edition)
    {
        return Inertia::render('Admin/Editions/Edit', [
            'edition' => $edition
        ]);
    }

    /**
     * Update the specified edition in storage.
     */
    public function update(Request $request, Edition $edition)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:2100',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after:start_date',
            'registration_start_date' => 'nullable|date|before_or_equal:registration_deadline',
            'registration_deadline' => 'nullable|date|before:end_date',
            'max_participants' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'status' => 'required|string|in:draft,published,active,completed,archived',
            'is_current' => 'boolean',
        ]);

        DB::transaction(function () use ($validated, $edition) {
            // If setting as current, unset all others
            if ($validated['is_current'] ?? false) {
                Edition::where('id', '!=', $edition->id)
                    ->where('is_current', true)
                    ->update(['is_current' => false]);
            }
            
            $edition->update($validated);
        });

        return redirect()->route('admin.editions.index')
                        ->with('success', 'Édition mise à jour avec succès.');
    }

    /**
     * Remove the specified edition from storage.
     */
    public function destroy(Edition $edition)
    {
        // Check if there are participants before deleting
        if ($edition->participants()->count() > 0) {
            return redirect()->back()
                        ->with('error', 'Impossible de supprimer cette édition car elle contient des participants.');
        }
        
        $edition->delete();

        return redirect()->route('admin.editions.index')
                        ->with('success', 'Édition supprimée avec succès.');
    }
    
    /**
     * Create default phases for a new edition.
     */
    private function createDefaultPhases(Edition $edition)
    {
        $phases = [
            [
                'name' => 'Lancement de l\'appel à candidatures',
                'color' => 'emerald',
                'icon' => 'calendar',
                'order' => 1,
                'activities' => json_encode([
                    'Publication officielle du concours',
                    'Ouverture du site de candidatures',
                    'Diffusion sur les réseaux sociaux',
                    'Sessions d\'information'
                ]),
                'objective' => 'Informer, motiver, et orienter les jeunes pour qu\'ils soumettent leur dossier.'
            ],
            [
                'name' => 'Sélection des candidatures',
                'color' => 'blue',
                'icon' => 'search',
                'order' => 2,
                'activities' => json_encode([
                    'Analyse des dossiers par un comité d\'experts',
                    'Évaluation selon les critères définis',
                    'Pré-sélection des meilleurs projets'
                ]),
                'objective' => 'Identifier les projets les plus prometteurs.'
            ],
            [
                'name' => 'Bootcamp d\'accélération',
                'color' => 'indigo',
                'icon' => 'book',
                'order' => 3,
                'location' => 'Conakry',
                'activities' => json_encode([
                    'Formation intensive pour les finalistes',
                    'Ateliers pratiques',
                    'Coaching par des mentors expérimentés',
                    'Préparation à la soutenance finale'
                ]),
                'objective' => 'Renforcer les compétences des candidats pour la réussite de leur projet.'
            ],
            [
                'name' => 'Journée de présentation des projets (Demo Day)',
                'color' => 'purple',
                'icon' => 'presentation',
                'order' => 4,
                'activities' => json_encode([
                    'Présentation publique des projets devant un jury',
                    'Présence des partenaires et investisseurs',
                    'Sélection des lauréats'
                ]),
                'objective' => 'Valoriser les projets et permettre un retour professionnel.'
            ],
            [
                'name' => 'Cérémonie de remise des prix',
                'color' => 'amber',
                'icon' => 'award',
                'order' => 5,
                'activities' => json_encode([
                    'Annonce officielle des lauréats',
                    'Remise des prix',
                    'Allocutions des autorités et partenaires'
                ])
            ],
            [
                'name' => 'Suivi & Accompagnement post-prix',
                'color' => 'rose',
                'icon' => 'chart-line',
                'order' => 6,
                'activities' => json_encode([
                    'Intégration dans un programme d\'incubation',
                    'Suivi technique et financier personnalisé',
                    'Mise en relation avec des partenaires'
                ]),
                'objective' => 'Garantir la réussite durable des projets primés.'
            ],
            [
                'name' => 'Clôture de l\'édition & Lancement de la suivante',
                'color' => 'teal',
                'icon' => 'flag',
                'order' => 7,
                'activities' => json_encode([
                    'Bilan de l\'édition',
                    'Témoignages des lauréats',
                    'Annonce de la prochaine édition'
                ])
            ]
        ];
        
        foreach ($phases as $phase) {
            $edition->phases()->create($phase);
        }
        
        // Create default prizes
        $prizes = [
            [
                'name' => 'Premier Prix',
                'amount' => 500000000,
                'currency' => 'GNF',
                'description' => 'Premier prix du Grand Prix FONIJ',
                'rank' => 1
            ],
            [
                'name' => 'Deuxième Prix',
                'amount' => 300000000,
                'currency' => 'GNF',
                'description' => 'Deuxième prix du Grand Prix FONIJ',
                'rank' => 2
            ],
            [
                'name' => 'Troisième Prix',
                'amount' => 200000000,
                'currency' => 'GNF',
                'description' => 'Troisième prix du Grand Prix FONIJ',
                'rank' => 3
            ],
            [
                'name' => 'Prix Spécial',
                'amount' => 100000000,
                'currency' => 'GNF',
                'description' => 'Prix spécial pour l\'innovation sociale',
                'rank' => 4
            ]
        ];
        
        foreach ($prizes as $prize) {
            $edition->prizes()->create($prize);
        }
    }
} 