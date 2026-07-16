import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="sticky top-0 z-20 border-b border-gray-200 bg-white md:hidden">
                <div className="flex items-center justify-between px-4 py-3">
                    <div>
                        <h1 className="font-bold tracking-wide">ERP</h1>
                        <p className="text-xs text-gray-500">Administración</p>
                    </div>

                    <Link
                        href="/products"
                        className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700"
                    >
                        Productos
                    </Link>
                </div>
            </header>

            <aside className="fixed top-0 left-0 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white md:flex">
                <div className="border-b border-gray-200 p-6">
                    <h1 className="text-xl font-bold tracking-wide">ERP</h1>

                    <p className="text-sm text-gray-500">Administración</p>
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

            <main className="p-4 sm:p-6 md:ml-64 md:p-10">{children}</main>
        </div>
    );
}
