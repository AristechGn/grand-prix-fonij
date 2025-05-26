<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ValidationController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route pour valider les étapes du formulaire de candidature
Route::post('/validate-step', [ValidationController::class, 'validateStep'])->name('api.validate-step'); 