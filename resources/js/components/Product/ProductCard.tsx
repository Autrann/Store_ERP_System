interface Props {
    product: any;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="flex gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

            <img
                src={
                    product.images.length
                        ? "/" + product.images[0].image
                        : "https://placehold.co/150x150"
                }
                className="h-36 w-36 rounded-lg object-cover"
            />

            <div className="flex flex-1 flex-col justify-between">

                <div>

                    <div className="flex items-center justify-between">

                        <h2 className="text-xl font-semibold">
                            {product.name}
                        </h2>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                            {product.sku}
                        </span>

                    </div>

                    <p className="mt-3 text-gray-600">
                        {product.description}
                    </p>

                </div>

                <div className="mt-5 flex gap-8 text-sm">

                    <div>

                        <p className="text-gray-400">
                            Marca
                        </p>

                        <p>{product.brand?.name}</p>

                    </div>

                    <div>

                        <p className="text-gray-400">
                            Categoría
                        </p>

                        <p>{product.category?.name}</p>

                    </div>

                    <div>

                        <p className="text-gray-400">
                            Stock
                        </p>

                        <p>{product.stock}</p>

                    </div>

                    <div>

                        <p className="text-gray-400">
                            Precio
                        </p>

                        <p className="font-semibold">
                            ${product.price}
                        </p>

                    </div>

                </div>

            </div>

            <div className="flex items-center">

                <button className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100">
                    Editar
                </button>

            </div>

        </div>
    );
}