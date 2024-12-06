<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/poumons', function () {
    return Inertia::render('Poumons');
})->middleware(['auth', 'verified'])->name('poumons');

Route::get('/components', function () {
    return Inertia::render('Components');
})->name('components');

Route::get('/profile', function () {
    return Inertia::render('Profile');
})->middleware(['auth', 'verified'])->name('profile.show');

Route::get('/about', function () {
    return Inertia::render('About');
})->middleware(['auth', 'verified'])->name('about');

Route::get('/shrimpyshot', function () {
    return Inertia::render('ShrimpyShot');
})->middleware(['auth', 'verified'])->name('shrimpyshot');

Route::get('/race', function () {
    return Inertia::render('racegame');
})->middleware(['auth', 'verified'])->name('racegame');

Route::get('/menu', function () {
    return Inertia::render('GameMenu');
})->middleware(['auth', 'verified'])->name('menu');

Route::get('/brain', function () {
    return Inertia::render('Brain');
})->middleware(['auth', 'verified'])->name('brain');

/* Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
}); */

require __DIR__.'/auth.php';
require __DIR__.'/api.php';
