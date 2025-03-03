<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\ClientAuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobApplicationController;

// Client Routes
Route::post('/client/register', [ClientAuthController::class, 'register']);
Route::post('/client/login', [ClientAuthController::class, 'login']);
Route::post('/client/logout', [ClientAuthController::class, 'logout']);

// Admin Routes
Route::post('/admin/register', [AdminAuthController::class, 'register']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::get('/admin/dashboard', [AdminAuthController::class, 'dashboard']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout']);

// ✅ Ensure the route is correctly registered for posting jobs


Route::post('/admin/post-job', [JobController::class, 'store']);
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/jobs/{id}', [JobController::class, 'show']);
Route::put('/jobs/{id}', [JobController::class, 'update']);
Route::delete('/jobs/{id}', [JobController::class, 'delete']);


//job applied
Route::post('/jobs/{id}/apply', [JobApplicationController::class, 'apply']);
//job show on frontend 
Route::get('/job-applications', [JobApplicationController::class, 'index']);
Route::delete('/job-applications/{id}', [JobApplicationController::class, 'delete']);
