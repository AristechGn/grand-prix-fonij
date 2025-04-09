<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use App\Models\Phase;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PhaseController extends Controller
{
    /**
     * Display a listing of the phases for an edition.
     */
    public function index(Edition $edition)
    {
        $phases = $edition->phases()->orderBy('order')->get();
        
        return Inertia::render('Admin/Phases/Index', [
            'edition' => $edition,
            'phases' => $phases
        ]);
    }

    /**
     * Show the form for creating a new phase.
     */
    public function create(Edition $edition)
    {
        return Inertia::render('Admin/Phases/Create', [
            'edition' => $edition
        ]);
    }

    /**
     * Store a newly created phase in storage.
     */
    public function store(Request $request, Edition $edition)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'order' => 'required|integer|min:1',
            'location' => 'nullable|string|max:255',
            'color' => 'required|string|max:50',
            'icon' => 'required|string|max:50',
            'status' => 'required|string|in:pending,active,completed',
            'activities' => 'nullable|array',
            'objective' => 'nullable|string',
        ]);
        
        // If activities is an array, encode it as JSON
        if (isset($validated['activities']) && is_array($validated['activities'])) {
            $validated['activities'] = json_encode($validated['activities']);
        }
        
        $edition->phases()->create($validated);
        
        return redirect()->route('admin.editions.phases.index', $edition)
                       ->with('success', 'Phase créée avec succès.');
    }

    /**
     * Display the specified phase.
     */
    public function show(Edition $edition, Phase $phase)
    {
        return Inertia::render('Admin/Phases/Show', [
            'edition' => $edition,
            'phase' => $phase
        ]);
    }

    /**
     * Show the form for editing the specified phase.
     */
    public function edit(Edition $edition, Phase $phase)
    {
        // Convert JSON activities back to array for editing
        if ($phase->activities) {
            $phase->activities = json_decode($phase->activities);
        }
        
        return Inertia::render('Admin/Phases/Edit', [
            'edition' => $edition,
            'phase' => $phase
        ]);
    }

    /**
     * Update the specified phase in storage.
     */
    public function update(Request $request, Edition $edition, Phase $phase)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'order' => 'required|integer|min:1',
            'location' => 'nullable|string|max:255',
            'color' => 'required|string|max:50',
            'icon' => 'required|string|max:50',
            'status' => 'required|string|in:pending,active,completed',
            'activities' => 'nullable|array',
            'objective' => 'nullable|string',
        ]);
        
        // If activities is an array, encode it as JSON
        if (isset($validated['activities']) && is_array($validated['activities'])) {
            $validated['activities'] = json_encode($validated['activities']);
        }
        
        $phase->update($validated);
        
        return redirect()->route('admin.editions.phases.index', $edition)
                       ->with('success', 'Phase mise à jour avec succès.');
    }

    /**
     * Remove the specified phase from storage.
     */
    public function destroy(Edition $edition, Phase $phase)
    {
        $phase->delete();
        
        return redirect()->route('admin.editions.phases.index', $edition)
                       ->with('success', 'Phase supprimée avec succès.');
    }
} 