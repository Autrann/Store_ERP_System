<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductImageController extends Controller
{
    public function store(Request $request, Product $product)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $path = $request->file('image')->store(
            'products',
            'public'
        );

        $position = $product->images()->max('position') ?? 0;

        $product->images()->create([
            'image' => $path,
            'position' => $position + 1,
        ]);

        return back();
    }

    public function destroy(ProductImage $image)
    {
        Storage::disk('public')->delete($image->image);

        $image->delete();

        return back();
    }
}
