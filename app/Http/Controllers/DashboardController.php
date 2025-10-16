<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Application;
use App\Models\Edition;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Affiche le tableau de bord avec les statistiques réelles
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        // Statistiques générales
        $stats = [
            'total_users' => User::count(),
            'total_applications' => Application::count(),
            'total_editions' => Edition::count(),
            'pending_applications' => Application::where('status', 'pending')->count(),
            'validated_applications' => Application::where('status', 'validated')->count(),
            'selected_applications' => Application::where('status', 'selected')->count(),
            'finalist_applications' => Application::where('status', 'finalist')->count(),
            'winner_applications' => Application::where('status', 'winner')->count(),
        ];

        // Statistiques par rôle d'utilisateur
        $userStats = [
            'candidates' => User::where('role', 'candidate')->count(),
            'jury' => User::where('role', 'jury')->count(),
            'admins' => User::where('role', 'admin')->count(),
            'super_admins' => User::where('role', 'super_admin')->count(),
            'regular_users' => User::where('role', 'user')->count(),
        ];

        // Statistiques par catégorie de candidature
        $applicationStats = [
            'promotion_entreprise' => Application::where('category', 1)->count(),
            'education_competences' => Application::where('category', 2)->count(),
            'transition_numerique' => Application::where('category', 3)->count(),
            'entrepreneuriat_agricole' => Application::where('category', 4)->count(),
            'grand_prix_jury' => Application::where('category', 5)->count(),
        ];

        // Statistiques par région
        $regionStats = Application::selectRaw('region, count(*) as count')
            ->groupBy('region')
            ->orderBy('count', 'desc')
            ->get();

        // Statistiques par genre
        $genderStats = Application::selectRaw('gender, count(*) as count')
            ->groupBy('gender')
            ->get();

        // Statistiques par niveau d'éducation
        $educationStats = Application::selectRaw('education_level, count(*) as count')
            ->groupBy('education_level')
            ->get();

        // Candidatures récentes (dernières 10)
        $recentApplications = Application::with(['user', 'edition'])
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($application) {
                return [
                    'id' => $application->id,
                    'application_number' => $application->application_number,
                    'first_name' => $application->first_name,
                    'last_name' => $application->last_name,
                    'project_name' => $application->project_name,
                    'status' => $application->status,
                    'category' => $application->category,
                    'city' => $application->city,
                    'region' => $application->region,
                    'created_at' => $application->created_at->format('d/m/Y H:i'),
                    'edition_name' => $application->edition->name ?? 'N/A',
                ];
            });

        // Utilisateurs récents (derniers 10)
        $recentUsers = User::orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'city' => $user->address ? explode(', ', $user->address)[1] ?? 'N/A' : 'N/A',
                    'created_at' => $user->created_at->format('d/m/Y H:i'),
                ];
            });

        // Évolutions mensuelles (derniers 6 mois)
        $monthlyStats = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $monthlyStats[] = [
                'month' => $date->format('M Y'),
                'applications' => Application::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
                'users' => User::whereYear('created_at', $date->year)
                    ->whereMonth('created_at', $date->month)
                    ->count(),
            ];
        }

        // Top 5 des villes avec le plus de candidatures
        $topCities = Application::selectRaw('city, count(*) as count')
            ->groupBy('city')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get();

        // Top 5 des professions les plus représentées
        $topProfessions = Application::selectRaw('profession, count(*) as count')
            ->groupBy('profession')
            ->orderBy('count', 'desc')
            ->limit(5)
            ->get();

        // Déterminer si l'utilisateur est admin
        $isAdmin = $user && in_array($user->role, ['admin', 'super_admin']);

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'userStats' => $userStats,
            'applicationStats' => $applicationStats,
            'regionStats' => $regionStats,
            'genderStats' => $genderStats,
            'educationStats' => $educationStats,
            'recentApplications' => $recentApplications,
            'recentUsers' => $recentUsers,
            'monthlyStats' => $monthlyStats,
            'topCities' => $topCities,
            'topProfessions' => $topProfessions,
            'isAdmin' => $isAdmin,
            'userRole' => $user->role ?? 'guest',
        ]);
    }

    /**
     * Affiche le tableau de bord d'administration (alias pour la même méthode)
     */
    public function admin(Request $request)
    {
        return $this->index($request);
    }
}
