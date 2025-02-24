<?php

use App\Http\Controllers\ClientController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;


Route::post('/register', [UsersController::class, 'Register']);
Route::get('/dashboard', [UsersController::class, 'dashboard']);
Route::post('/login', [UsersController::class, 'login']);
Route::post('/logout', [UsersController::class, 'logout']);

Route::post('/client/register', [ClientController::class, 'register']);
Route::post('/client/login', [ClientController::class, 'login']);
Route::post('/client/logout', [ClientController::class,'logout'])->middleware('auth:api');
