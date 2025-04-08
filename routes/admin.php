<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;

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
}); 