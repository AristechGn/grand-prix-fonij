<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Affiche la liste des utilisateurs
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $super_admin = $request->user()?->role === 'super_admin';

        $search = $request->input('search', '');
        $role = $request->input('role', 'all');
        $perPage = $request->input('per_page', 50);

        $query = User::query()
            ->where('role', '!=', 'candidate');

        if(!$super_admin)
        {
            $query = User::query()
                ->where('role', '!=', 'super_admin');
        }
            
        // Filtrage par recherche
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                  ->orWhere('last_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }
        
        // Filtrage par rôle
        if ($role !== 'all') {
            $query->where('role', $role);
        }
        
        $users = $query->paginate($perPage)
                      ->withQueryString();
        
        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => $search,
                'role' => $role,
                'perPage' => $perPage
            ]
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
            'gender' => 'required|string|in:male,female',
            'profession' => 'nullable|string|max:255',
        ]);

        // Formater la date de naissance si elle existe
        if (isset($validated['birth_date']) && !empty($validated['birth_date'])) {
            $validated['birth_date'] = Carbon::parse($validated['birth_date'])->format('Y-m-d');
        }

        $validated['gender'] = $validated['gender'] === 'male' ? 'Homme' : 'Femme';

        $validated['password'] = Hash::make($validated['password']);
        
        User::create($validated);

        return redirect()->route('admin.users.index')->with('success', 'Utilisateur créé avec succès');
    }

    /**
     * Affiche les détails d'un utilisateur
     * 
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        // Protection contre l'accès aux utilisateurs super_admin
        if ($user->role === 'super_admin' && !Auth::user()->isSuperAdmin()) {
            abort(403, 'Accès non autorisé');
        }
        
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
        // Protection contre l'accès aux utilisateurs super_admin
        if ($user->role === 'super_admin' && !Auth::user()->isSuperAdmin()) {
            abort(403, 'Accès non autorisé');
        }
        
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
        // Protection contre la modification des utilisateurs super_admin
        if ($user->role === 'super_admin' && !Auth::user()->isSuperAdmin()) {
            abort(403, 'Accès non autorisé');
        }
        
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

        // Empêcher un utilisateur de changer son propre rôle
        if (Auth::id() === $user->id && $user->role !== $validated['role']) {
            $validated['role'] = $user->role;
        }

        // Formater la date de naissance si elle existe
        if (isset($validated['birth_date']) && !empty($validated['birth_date'])) {
            $validated['birth_date'] = Carbon::parse($validated['birth_date'])->format('Y-m-d');
        }

        // Si le mot de passe est fourni, le hacher
        if ($request->filled('password')) {
            $request->validate([
                'password' => 'string|min:8|confirmed',
            ]);
            $validated['password'] = Hash::make($request->password);
        }

        $validated['gender'] = $validated['gender'] === 'male' ? 'Homme' : 'Femme';

        $user->update($validated);
        
        return redirect()->route('admin.users.index')->with('success', 'Utilisateur mis à jour avec succès');
    }

    /**
     * Supprime un utilisateur existant
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        // Protection contre la suppression des utilisateurs super_admin
        if ($user->role === 'super_admin') {
            abort(403, 'Accès non autorisé');
        }
        
        // Empêcher un utilisateur de se supprimer lui-même
        if (Auth::id() === $user->id) {
            return redirect()->route('admin.users.index')->with('error', 'Vous ne pouvez pas supprimer votre propre compte');
        }
        
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'Utilisateur supprimé avec succès');
    }

    /**
     * Restaure un utilisateur supprimé
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        $user->restore();

        return redirect()->route('admin.users.index')->with('success', 'Utilisateur restauré avec succès.');
    }

    /**
     * Supprime définitivement un utilisateur
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function forceDelete($id)
    {
        $user = User::withTrashed()->findOrFail($id);
        
        // Empêcher la suppression définitive du super admin
        if ($user->role === 'super_admin') {
            return redirect()->back()->with('error', 'Impossible de supprimer définitivement un super administrateur.');
        }

        $user->forceDelete();

        return redirect()->route('admin.users.index')->with('success', 'Utilisateur supprimé définitivement.');
    }

    /**
     * Affiche les utilisateurs supprimés
     *
     * @return \Illuminate\Http\Response
     */
    public function trashed()
    {
        $users = User::onlyTrashed()
            ->orderBy('deleted_at', 'desc')
            ->paginate(50);

        return Inertia::render('Admin/Users/Trashed', [
            'users' => $users
        ]);
    }
}
