<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;

Route::inertia('/', 'welcome')->name('home');

Route::get('/products', [ProductController::class, 'index']);
Route::put('/products/{product}', [ProductController::class, 'update']);
Route::delete('/products/{product}', [ProductController::class, 'destroy']);

Route::post('/products/{product}/images', [ProductImageController::class, 'store']);
Route::delete('/products/images/{image}', [ProductImageController::class, 'destroy']);