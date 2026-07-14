<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->with([
                'category',
                'brand',
                'images',
            ]);

        if ($request->filled('search')) {
            $search = $request->search;

            $products->where(function ($query) use ($search) {
                $query->where('sku', 'like', "%{$search}%")
                      ->orWhere('name', 'like', "%{$search}%");
            });
        }

        return Inertia::render('Products/Index', [
            'products' => $products->get(),
            'filters' => [
                'search' => $request->search ?? '',
            ],
        ]);
    }
}