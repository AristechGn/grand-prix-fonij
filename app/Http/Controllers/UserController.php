<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserController extends Controller
{
    /**
     * Affiche la liste des utilisateurs
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::where('role', '!=', 'super_admin')
                      ->where('role', '!=', 'candidate')
                      ->paginate(10);
        
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    /**
     * Affiche le formulaire de création d'un utilisateur
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    /**
     * Enregistre un nouvel utilisateur
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'phone' => 'nullable|string|max:20',
            'role' => 'required|string|in:user,admin,jury',
            'address' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female,other',
            'profession' => 'nullable|string|max:255',
        ]);

        // Formater la date de naissance si elle existe
        if (isset($validated['birth_date'])) {
            $validated['birth_date'] = Carbon::parse($validated['birth_date'])->format('Y-m-d');
        }

        $validated['gender'] = $validated['gender'] == 'male' ? 'Homme' : 'Femme';

        $validated['password'] = Hash::make($validated['password']);
        
        User::create($validated);

        return redirect()->route('users.index')->with('success', 'Utilisateur créé avec succès');
    }

    /**
     * Affiche les détails d'un utilisateur
     * 
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }

    /**
     * Affiche le formulaire de modification d'un utilisateur
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    /**
     * Met à jour un utilisateur existant
     *
     * @param \Illuminate\Http\Request $request
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
            'phone' => 'nullable|string|max:20',
            'role' => 'required|string|in:user,admin,jury',
            'address' => 'nullable|string|max:255',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string|in:male,female,other',
            'profession' => 'nullable|string|max:255',
        ]);

        // Formater la date de naissance si elle existe
        if (isset($validated['birth_date'])) {
            $validated['birth_date'] = Carbon::parse($validated['birth_date'])->format('Y-m-d');
        }
        $validated['gender'] = $validated['gender'] == 'male' ? 'Homme' : 'Femme';

        // Si le mot de passe est fourni, le hacher
        if ($request->filled('password')) {
            $request->validate([
                'password' => 'string|min:8|confirmed',
            ]);
            $validated['password'] = Hash::make($request->password);
        }

        $user->update($validated);
        
        return redirect()->route('users.index')->with('success', 'Utilisateur mis à jour avec succès');
    }

    /**
     * Supprime un utilisateur existant
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success', 'Utilisateur supprimé avec succès');
    }
}
