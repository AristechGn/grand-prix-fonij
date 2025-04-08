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
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\UserController;

Route::get('/init', [RegisteredUserController::class, 'init'])->name('app.init');

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/categories', function () {
    return Inertia::render('Categories');
})->name('categories');

Route::get('/accompagnement', function () {
    return Inertia::render('Programmes');
})->name('programmes');

Route::get('/deroulement', function () {
    return Inertia::render('Deroulement');
})->name('deroulement');

Route::get('/actualites', function () {
    return Inertia::render('Actualites');
})->name('actualites');

Route::get('/candidater', function () {
    return Inertia::render('Candidater');
})->name('candidater');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/utilisateurs', [UserController::class, 'index'])->name('users.index');
    Route::get('/utilisateurs/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/utilisateurs', [UserController::class, 'store'])->name('users.store');
    Route::get('/utilisateurs/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/utilisateurs/{user}', [UserController::class, 'update'])->name('users.update');
    Route::get('/utilisateurs/{user}', [UserController::class, 'show'])->name('users.show');
    Route::delete('/utilisateurs/{user}', [UserController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
