<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::insert([
            [
                'category_id' => 1,
                'brand_id' => 1,
                'name' => 'Peluche Pikachu 25 cm',
                'sku' => 'PKM-001',
                'description' => 'Peluche oficial de Pikachu.',
                'price' => 399.00,
                'stock' => 10,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 2,
                'brand_id' => 5,
                'name' => 'Funko Pop Goku',
                'sku' => 'FUN-001',
                'description' => 'Figura Funko Pop.',
                'price' => 499.00,
                'stock' => 8,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'category_id' => 5,
                'brand_id' => 1,
                'name' => 'Sobre Pokémon Destinos de Paldea',
                'sku' => 'TCG-001',
                'description' => 'Booster de Pokémon TCG.',
                'price' => 99.00,
                'stock' => 50,
                'active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
