import AdminLayout from "@/components/Layout/AdminLayout";
import ProductForm from "@/components/Product/ProductForm";

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

export default function Create({
    categories,
    brands,
}: Props) {
    return (
        <AdminLayout>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Nuevo producto
                </h1>

                <p className="mt-2 text-gray-500">
                    Completa la información del producto.
                </p>

            </div>

            <ProductForm
                categories={categories}
                brands={brands}
            />

        </AdminLayout>
    );
}