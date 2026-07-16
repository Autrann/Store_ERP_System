import { Link, router } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { useState } from 'react';

import AdminLayout from '@/components/Layout/AdminLayout';
import ProductCard from '@/components/Product/ProductCard';

interface Product {
    id: number;
    name: string;
    description: string;
    sku: string;
    price: number;
    stock: number;

    category: {
        name: string;
    };

    brand: {
        name: string;
    };

    images: {
        image: string;
    }[];
}

interface Props {
    products: Product[];
    filters: {
        search: string;
    };
}

export default function Index({ products, filters }: Props) {
    const [search, setSearch] = useState(filters.search ?? '');

    function submit(e: FormEvent) {
        e.preventDefault();

        router.get(
            '/products',
            {
                search,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    return (
        <AdminLayout>
            <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold">Inventario</h1>

                    <p className="mt-1 text-gray-500">
                        Administra los productos de la tienda.
                    </p>
                </div>

                <Link
                    href="/products/create"
                    className="w-full rounded-lg bg-black px-5 py-3 text-center text-white transition hover:bg-gray-800 sm:w-auto"
                >
                    Nuevo producto
                </Link>
            </div>

            <form
                onSubmit={submit}
                className="mb-8 flex flex-col gap-3 sm:flex-row"
            >
                <input
                    type="text"
                    placeholder="Buscar por SKU o nombre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
                />

                <button
                    type="submit"
                    className="rounded-lg border border-gray-300 bg-white px-6 py-3 transition hover:bg-gray-100"
                >
                    Buscar
                </button>
            </form>

            <div className="space-y-5">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center">
                        <h2 className="text-lg font-semibold">
                            No se encontraron productos
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Intenta con otro nombre o SKU.
                        </p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
