import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Props {
    product: any;
}

export default function ProductCard({ product }: Props) {
    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState({
        name: product.name,
        sku: product.sku,
        description: product.description,
        price: product.price,
        stock: product.stock,
    });

    function save() {
        router.put(`/products/${product.id}`, form, {
            preserveScroll: true,

            onSuccess: () => {
                setEditing(false);
            },
        });
    }

    function destroyProduct() {
        const confirmed = window.confirm(
            '¿Estás completamente seguro de eliminar este producto?\n\nEsta acción eliminará el producto permanentemente y NO se puede deshacer.',
        );

        if (!confirmed) return;

        router.delete(`/products/${product.id}`, {
            preserveScroll: true,
        });
    }

    return (
        <div
            className={`flex gap-6 rounded-xl border p-5 shadow-sm transition ${
                product.stock === 0
                    ? 'border-red-200 bg-gray-100 opacity-60'
                    : 'border-gray-200 bg-white'
            }`}
        >
            <img
                src={
                    product.images.length
                        ? '/' + product.images[0].image
                        : 'https://placehold.co/150'
                }
                className="h-36 w-36 rounded-lg object-cover"
            />

            <div className="flex-1">
                {editing ? (
                    <>
                        <input
                            className="mb-3 w-full rounded border p-2"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                        />

                        <textarea
                            className="mb-3 w-full rounded border p-2"
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                        />

                        <input
                            className="mb-3 w-full rounded border p-2"
                            value={form.sku}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    sku: e.target.value,
                                })
                            }
                        />

                        <div className="grid grid-cols-2 gap-3">
                            <input
                                type="number"
                                className="rounded border p-2"
                                value={form.price}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        price: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="number"
                                className="rounded border p-2"
                                value={form.stock}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        stock: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                {product.name}
                            </h2>
                            {product.stock === 0 && (
                                <span className="mt-2 inline-block rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                                    SIN STOCK
                                </span>
                            )}

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                                {product.sku}
                            </span>
                        </div>

                        <p className="mt-3 text-gray-600">
                            {product.description}
                        </p>

                        <div className="mt-5 flex gap-10">
                            <div>
                                <p className="text-sm text-gray-500">Marca</p>

                                <p>{product.brand?.name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Categoría
                                </p>

                                <p>{product.category?.name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Precio</p>

                                <p>${product.price}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Stock</p>

                                <p>{product.stock}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-2">
                {editing ? (
                    <>
                        <button
                            onClick={save}
                            className="rounded bg-black px-4 py-2 text-white"
                        >
                            Guardar
                        </button>

                        <button
                            onClick={destroyProduct}
                            className="rounded border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50"
                        >
                            Eliminar
                        </button>

                        <button
                            onClick={() => setEditing(false)}
                            className="rounded border px-4 py-2"
                        >
                            Cancelar
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setEditing(true)}
                        className="rounded border px-4 py-2"
                    >
                        Editar
                    </button>
                )}
            </div>
        </div>
    );
}
