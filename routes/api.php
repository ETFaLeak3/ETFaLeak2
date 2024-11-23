<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AvatarController;

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