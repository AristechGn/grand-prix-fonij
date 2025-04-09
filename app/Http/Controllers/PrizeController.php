<?php

namespace App\Http\Controllers;

use App\Models\Edition;
use App\Models\Prize;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PrizeController extends Controller
{
    /**
     * Display a listing of the prizes for an edition.
     */
    public function index(Edition $edition)
    {
        $prizes = $edition->prizes()->orderBy('rank')->get();
        
        return Inertia::render('Admin/Prizes/Index', [
            'edition' => $edition,
            'prizes' => $prizes
        ]);
    }

    /**
     * Show the form for creating a new prize.
     */
    public function create(Edition $edition)
    {
        return Inertia::render('Admin/Prizes/Create', [
            'edition' => $edition
        ]);
    }

    /**
     * Store a newly created prize in storage.
     */
    public function store(Request $request, Edition $edition)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'currency' => 'required|string|max:3',
            'category' => 'nullable|string|max:255',
            'rank' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);
        
        $edition->prizes()->create($validated);
        
        return redirect()->route('admin.editions.prizes.index', $edition)
                       ->with('success', 'Prix créé avec succès.');
    }

    /**
     * Display the specified prize.
     */
    public function show(Edition $edition, Prize $prize)
    {
        return Inertia::render('Admin/Prizes/Show', [
            'edition' => $edition,
            'prize' => $prize
        ]);
    }

    /**
     * Show the form for editing the specified prize.
     */
    public function edit(Edition $edition, Prize $prize)
    {
        return Inertia::render('Admin/Prizes/Edit', [
            'edition' => $edition,
            'prize' => $prize
        ]);
    }

    /**
     * Update the specified prize in storage.
     */
    public function update(Request $request, Prize $prize)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'currency' => 'required|string|max:3',
            'category' => 'nullable|string|max:255',
            'rank' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);
        
        $prize->update($validated);
        
        return redirect()->route('admin.editions.prizes.index', ['edition' => $prize->edition_id])
                       ->with('success', 'Prix mis à jour avec succès.');
    }

    /**
     * Remove the specified prize from storage.
     */
    public function destroy(Edition $edition, Prize $prize)
    {
        $prize->delete();
        
        return redirect()->route('admin.editions.prizes.index', $edition)
                       ->with('success', 'Prix supprimé avec succès.');
    }
} 