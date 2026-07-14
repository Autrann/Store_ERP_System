<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductImage;

class ProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ProductImage::insert([
            [
                'product_id' => 1,
                'image' => 'images/products/pikachu.jpg'
            ],
            [
                'product_id' => 2,
                'image' => 'images/products/goku.jpg'
            ],
            [
                'product_id' => 3,
                'image' => 'images/products/pokemon-pack.jpg'
            ],
        ]);
    }
}
