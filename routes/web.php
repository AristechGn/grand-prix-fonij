<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\HomeController;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/categories', function () {
    return Inertia::render('Categories');
})->name('categories');

Route::get('/programmes', function () {
    return Inertia::render('Programmes');
})->name('programmes');

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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
