<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AvatarController;

// Obtain the avatar of a user
Route::get('/user/avatar/{user}', [AvatarController::class, 'show'])
->middleware('throttle:120,1')
->name('user.avatar.show');

// Update the avatar of a user
Route::post('/user/avatar', [AvatarController::class, 'store'])
->middleware(['auth', 'verified'])->name('user.avatar.update');