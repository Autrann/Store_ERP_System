import { useState } from "react";
import { router } from "@inertiajs/react";

import ProductImageViewer from "@/components/Product/ProductImageViewer";

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
            "¿Estás completamente seguro de eliminar este producto?\n\nEsta acción eliminará el producto permanentemente y NO se puede deshacer."
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
                    ? "border-red-200 bg-gray-100 opacity-60"
                    : "border-gray-200 bg-white"
            }`}
        >
            <ProductImageViewer
                productId={product.id}
                images={product.images}
                editing={editing}
            />

            <div className="flex-1">
                {editing ? (
                    <>
                        <input
                            className="mb-3 w-full rounded-lg border border-gray-300 p-2"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                        />

                        <textarea
                            className="mb-3 w-full rounded-lg border border-gray-300 p-2"
                            rows={4}
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description: e.target.value,
                                })
                            }
                        />

                        <input
                            className="mb-3 w-full rounded-lg border border-gray-300 p-2"
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
                                className="rounded-lg border border-gray-300 p-2"
                                value={form.price}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        price: Number(e.target.value),
                                    })
                                }
                            />

                            <input
                                type="number"
                                className="rounded-lg border border-gray-300 p-2"
                                value={form.stock}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        stock: Number(e.target.value),
                                    })
                                }
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold">
                                {product.name}
                            </h2>

                            {product.stock === 0 && (
                                <span className="rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
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

                        <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Marca
                                </p>

                                <p>{product.brand?.name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Categoría
                                </p>

                                <p>{product.category?.name}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Precio
                                </p>

                                <p className="font-semibold">
                                    ${product.price}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Stock
                                </p>

                                <p>{product.stock}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="flex min-w-32 flex-col gap-2">
                {editing ? (
                    <>
                        <button
                            onClick={save}
                            className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800"
                        >
                            Guardar
                        </button>

                        <button
                            onClick={destroyProduct}
                            className="rounded-lg border border-red-300 px-4 py-2 text-red-600 transition hover:bg-red-50"
                        >
                            Eliminar
                        </button>

                        <button
                            onClick={() => setEditing(false)}
                            className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setEditing(true)}
                        className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
                    >
                        Editar
                    </button>
                )}
            </div>
        </div>
    );
}