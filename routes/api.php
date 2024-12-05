<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AvatarController;
use App\Http\Controllers\ProfileController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Obtain the avatar of a user
Route::get('/api/user/avatar/{user}', [AvatarController::class, 'show'])
->middleware('throttle:120,1')
->name('user.avatar.show');

// Update the avatar of a user
Route::post('/api/user/avatar', [AvatarController::class, 'store'])
->middleware(['auth', 'verified'])->name('user.avatar.update');

Route::post('/api/add/score', [ProfileController::class, 'addScore'])
->middleware(['auth', 'verified', 'throttle:10,1'])->name('user.score.add');

Route::post('/api/reset/score', [ProfileController::class, 'resetScore'])
->middleware(['auth', 'verified', 'throttle:10,1'])->name('user.score.reset');

Route::get('/api/score', [ProfileController::class, 'showScore'])
->middleware(['auth', 'verified'])->name('user.score.show');