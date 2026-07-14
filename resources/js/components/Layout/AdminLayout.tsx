import { ReactNode } from "react";
import { Link } from "@inertiajs/react";

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-gray-100">
            <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
                <div className="border-b border-gray-200 p-6">
                    <h1 className="text-xl font-bold tracking-wide">
                        ERP
                    </h1>

                    <p className="text-sm text-gray-500">
                        Administración
                    </p>
                </div>

                <nav className="flex flex-col gap-2 p-4">
                    <Link
                        href="/products"
                        className="rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                    >
                        Productos
                    </Link>

                    <button className="rounded-lg px-4 py-2 text-left text-gray-400">
                        Categorías
                    </button>

                    <button className="rounded-lg px-4 py-2 text-left text-gray-400">
                        Marcas
                    </button>

                    <button className="rounded-lg px-4 py-2 text-left text-gray-400">
                        Pedidos
                    </button>
                </nav>
            </aside>

            <main className="ml-64 p-10">
                {children}
            </main>
        </div>
    );
}