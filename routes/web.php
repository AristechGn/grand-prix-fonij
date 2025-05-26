<?php

/*
 * Nom       : Gnimassou
 * Prénom    : Jean-Marie Aristide 
 * Email     : aristechdev@gmail.com
 *
 * Signature DREAMER:
 *
 *  _______   _______   ________   ______   __       __  ________  _______  
 * /       \ /       \ /        | /      \ /  \     /  |/        |/       \ 
 * $$$$$$$  |$$$$$$$  |$$$$$$$$/ /$$$$$$  |$$  \   /$$ |$$$$$$$$/ $$$$$$$  |
 * $$ |  $$ |$$ |__$$ |$$ |__    $$ |__$$ |$$$  \ /$$$ |$$ |__    $$ |__$$ |
 * $$ |  $$ |$$    $$< $$    |   $$    $$ |$$$$  /$$$$ |$$    |   $$    $$< 
 * $$ |  $$ |$$$$$$$  |$$$$$/    $$$$$$$$ |$$ $$ $$/$$ |$$$$$/    $$$$$$$  |
 * $$ |__$$ |$$ |  $$ |$$ |_____ $$ |  $$ |$$ |$$$/ $$ |$$ |_____ $$ |  $$ |
 * $$    $$/ $$ |  $$ |$$       |$$ |  $$ |$$ | $/  $$ |$$       |$$ |  $$ |
 * $$$$$$/  $$/   $$/ $$$$$$$$/ $$/   $$/ $$/      $$/ $$$$$$$$/ $$/   $$/ 
 *
 */

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/init', [RegisteredUserController::class, 'init'])->name('app.init');

Route::get('/', [WelcomeController::class, 'home'])->name('home');

Route::get('/categories-de-prix', [WelcomeController::class, 'categories'])->name('categories');

Route::get('/accompagnement', [WelcomeController::class, 'accompagnement'])->name('accompagnement');

Route::get('/programme', [WelcomeController::class, 'programme'])->name('programme');

Route::get('/actualites', [WelcomeController::class, 'actualites'])->name('actualites');

// Routes pour les candidatures
Route::get('/candidater', [ApplicationController::class, 'create'])->name('candidater');
Route::post('/candidater', [ApplicationController::class, 'store'])->name('candidater.store');
Route::get('/candidature/confirmation/{reference}', [ApplicationController::class, 'confirmation'])
    ->name('candidature.confirmation');
Route::get('/candidature/{applicationNumber}', [ApplicationController::class, 'show'])->name('candidater.show');

Route::get('/a-propos', [WelcomeController::class, 'about'])->name('about.index');

Route::get('/contact', [WelcomeController::class, 'contact'])->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::redirect('/utilisateurs', '/admin/users')->name('users.redirect');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/admin.php';
