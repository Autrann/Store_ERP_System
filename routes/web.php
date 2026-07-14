<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::inertia('/', 'welcome')->name('home');
Route::get('/products', [ProductController::class, 'index']);