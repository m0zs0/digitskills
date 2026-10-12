<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\RegistrationController;

Route::post('/register', [RegistrationController::class, 'store']);
Route::get('/registrations', [RegistrationController::class, 'index']);
