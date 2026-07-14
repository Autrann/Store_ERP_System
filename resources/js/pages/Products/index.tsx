import AdminLayout from "@/components/Layout/AdminLayout";
import ProductCard from "@/components/Product/ProductCard";

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
}

export default function Index({ products }: Props) {
    return (
        <AdminLayout>

            <div className="mb-10 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Inventario
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Administra los productos de la tienda.
                    </p>

                </div>

                <button className="rounded-lg bg-black px-5 py-3 text-white transition hover:bg-gray-800">
                    Nuevo producto
                </button>

            </div>

            <div className="mb-8 flex gap-3">

                <input
                    type="text"
                    placeholder="Buscar por SKU o nombre..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
                />

                <button className="rounded-lg border border-gray-300 bg-white px-6 transition hover:bg-gray-100">
                    Buscar
                </button>

            </div>

            <div className="space-y-5">

                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}

            </div>

        </AdminLayout>
    );
}