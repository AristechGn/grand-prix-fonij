<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\PhaseController;
use App\Http\Controllers\PrizeController;
use App\Http\Controllers\EditionController;

/*
|--------------------------------------------------------------------------
| Routes d'administration
|--------------------------------------------------------------------------
|
| Ce fichier contient toutes les routes liées aux fonctionnalités 
| d'administration de l'application.
|
*/

Route::middleware(['auth', 'verified', AdminMiddleware::class.':admin'])->prefix('admin')->name('admin.')->group(function () {
    
    // Dashboard d'administration
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');
    
    // Gestion des utilisateurs
    Route::resource('users', UserController::class);
    
    // Statistiques
    Route::get('/statistiques', function () {
        return Inertia::render('Admin/Statistics');
    })->name('statistics');

    // Gestion des éditions et configurations
    Route::resource('editions', EditionController::class);

    // Gestion des phases par édition
    Route::resource('editions.phases', PhaseController::class)->shallow();

    // Gestion des prix par édition
    Route::resource('editions.prizes', PrizeController::class)->shallow();
}); 