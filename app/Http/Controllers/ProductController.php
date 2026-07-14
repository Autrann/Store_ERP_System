<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Products/index', [
            'products' => Product::with([
                'category',
                'brand',
                'images'
            ])->get()
        ]);
    }
}