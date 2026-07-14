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

            <h1
                style={{
                    marginBottom: 30,
                }}
            >
                Inventario
            </h1>

            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}

        </AdminLayout>
    );
}