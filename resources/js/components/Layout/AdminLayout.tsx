import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
                fontFamily: "Arial",
            }}
        >
            <aside
                style={{
                    width: 250,
                    background: "#1f2937",
                    color: "white",
                    padding: 20,
                }}
            >
                <h2>ERP</h2>

                <hr />

                <p>Dashboard</p>

                <p>Productos</p>

                <p>Categorías</p>

                <p>Marcas</p>

                <p>Pedidos</p>
            </aside>

            <main
                style={{
                    flex: 1,
                    padding: 30,
                    background: "#f5f5f5",
                }}
            >
                {children}
            </main>
        </div>
    );
}