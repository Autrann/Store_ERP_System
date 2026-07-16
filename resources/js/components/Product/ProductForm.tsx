import { useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Brand {
    id: number;
    name: string;
}

interface Props {
    categories: Category[];
    brands: Brand[];
}

export default function ProductForm({ categories, brands }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        category_id: '',
        brand_id: '',
        name: '',
        sku: '',
        description: '',
        price: '',
        stock: '',
    });

    function submit(e: FormEvent) {
        e.preventDefault();

        post('/products');
    }

    return (
        <form
            onSubmit={submit}
            className="space-y-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:p-8"
        >
            <div>
                <label className="mb-2 block font-medium">Nombre</label>

                <input
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />

                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block font-medium">SKU</label>

                    <input
                        value={data.sku}
                        onChange={(e) => setData('sku', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    />

                    <p className="mt-1 text-sm text-red-500">{errors.sku}</p>
                </div>

                <div>
                    <label className="mb-2 block font-medium">Precio</label>

                    <input
                        type="number"
                        step="0.01"
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    />

                    <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
                <div>
                    <label className="mb-2 block font-medium">Stock</label>

                    <input
                        type="number"
                        value={data.stock}
                        onChange={(e) => setData('stock', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    />

                    <p className="mt-1 text-sm text-red-500">{errors.stock}</p>
                </div>

                <div>
                    <label className="mb-2 block font-medium">Categoría</label>

                    <select
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3"
                    >
                        <option value="">Selecciona...</option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <p className="mt-1 text-sm text-red-500">
                        {errors.category_id}
                    </p>
                </div>
            </div>

            <div>
                <label className="mb-2 block font-medium">Marca</label>

                <select
                    value={data.brand_id}
                    onChange={(e) => setData('brand_id', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                >
                    <option value="">Sin marca</option>

                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>

                <p className="mt-1 text-sm text-red-500">{errors.brand_id}</p>
            </div>

            <div>
                <label className="mb-2 block font-medium">Descripción</label>

                <textarea
                    rows={5}
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3"
                />
            </div>

            <div className="flex justify-stretch sm:justify-end">
                <button
                    disabled={processing}
                    className="w-full rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 sm:w-auto"
                >
                    Guardar producto
                </button>
            </div>
        </form>
    );
}
