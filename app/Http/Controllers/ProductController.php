<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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

    public function update(Request $request, Product $product)
{
    $validated = $request->validate([
        'name' => 'required|max:255',
        'description' => 'nullable',
        'sku' => 'required|max:255|unique:products,sku,' . $product->id,
        'price' => 'required|numeric|min:0',
        'stock' => 'required|integer|min:0',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
    ]);

    $product->update([
        'name' => $validated['name'],
        'description' => $validated['description'] ?? null,
        'sku' => $validated['sku'],
        'price' => $validated['price'],
        'stock' => $validated['stock'],
    ]);

    if ($request->hasFile('image')) {

        $currentImage = $product->images()->first();

        if ($currentImage) {

            Storage::disk('public')->delete($currentImage->image);

        }

        $path = $request->file('image')->store(
            'products',
            'public'
        );

        if ($currentImage) {

            $currentImage->update([
                'image' => $path,
            ]);

        } else {

            $product->images()->create([
                'image' => $path,
            ]);

        }

    }

    return back();
}

    public function destroy(Product $product)
    {
        $product->delete();

        return back();
    }
}
