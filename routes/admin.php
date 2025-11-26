<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\PhaseController;
use App\Http\Controllers\PrizeController;
use App\Http\Controllers\EditionController;
use App\Http\Controllers\Admin\ApplicationController;
use App\Http\Controllers\Admin\ApplicationCommentController;
use App\Http\Controllers\Admin\ApplicationRatingController;

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
    Route::get('/dashboard', [App\Http\Controllers\DashboardController::class, 'admin'])->name('dashboard');

    // Gestion des utilisateurs
    Route::get('/users/trashed', [UserController::class, 'trashed'])->name('users.trashed');
    Route::post('/users/{id}/restore', [UserController::class, 'restore'])->name('users.restore');
    Route::delete('/users/{id}/force-delete', [UserController::class, 'forceDelete'])->name('users.force-delete');
    Route::resource('users', UserController::class);

    // Statistiques
    Route::get('/statistiques', function () {
        return Inertia::render('Admin/Statistics');
    })->name('statistics');

    // Gestion des éditions et configurations
    Route::get('/editions/trashed', [EditionController::class, 'trashed'])->name('editions.trashed');
    Route::post('/editions/{id}/restore', [EditionController::class, 'restore'])->name('editions.restore');
    Route::delete('/editions/{id}/force-delete', [EditionController::class, 'forceDelete'])->name('editions.force-delete');
    Route::resource('editions', EditionController::class);

    // Gestion des phases par édition
    Route::resource('editions.phases', PhaseController::class)->shallow();

    // Gestion des prix par édition
    Route::resource('editions.prizes', PrizeController::class)->shallow();

    // Gestion des candidatures
    Route::get('/applications', [ApplicationController::class, 'index'])->name('applications.index');
    Route::get('/applications/by-edition', [ApplicationController::class, 'byEdition'])->name('applications.by-edition');
    Route::get('/applications/by-edition/{edition}', [ApplicationController::class, 'byEditionShow'])->name('applications.by-edition.show');
    Route::get('/applications/export', [ApplicationController::class, 'export'])->name('applications.export');
    Route::get('/applications/export-folders', [ApplicationController::class, 'exportFolders'])->name('applications.export-folders');
    Route::get('/applications/{application}', [ApplicationController::class, 'show'])->name('applications.show');
    Route::get('/applications/{application}/edit', [ApplicationController::class, 'edit'])->name('applications.edit');
    Route::put('/applications/{application}', [ApplicationController::class, 'update'])->name('applications.update');
    Route::delete('/applications/{application}', [ApplicationController::class, 'destroy'])->name('applications.destroy');
    Route::get('/applications/{application}/download/{document}', [ApplicationController::class, 'downloadDocument'])
        ->name('applications.download-document');

    // Gestion des commentaires sur les candidatures
    Route::get('/applications/{application}/comments', [ApplicationCommentController::class, 'index'])
        ->name('applications.comments.index');
    Route::post('/applications/{application}/comments', [ApplicationCommentController::class, 'store'])
        ->name('applications.comments.store');
    Route::put('/comments/{comment}', [ApplicationCommentController::class, 'update'])
        ->name('applications.comments.update');
    Route::delete('/comments/{comment}', [ApplicationCommentController::class, 'destroy'])
        ->name('applications.comments.destroy');

    // Gestion des évaluations des candidatures
    Route::post('/applications/{application}/rate', [ApplicationRatingController::class, 'rate'])
        ->name('applications.rate');
    Route::get('/applications/{application}/rating', [ApplicationRatingController::class, 'getUserRating'])
        ->name('applications.rating');
    Route::get('/applications/{application}/ratings', [ApplicationRatingController::class, 'getAllRatings'])
        ->name('applications.ratings');
});
