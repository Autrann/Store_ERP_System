interface Props {
    product: any;
}

export default function ProductCard({ product }: Props) {
    return (
        <div
            style={{
                display: "flex",
                gap: 20,
                background: "white",
                borderRadius: 10,
                padding: 20,
                marginBottom: 20,
                boxShadow: "0 2px 5px rgba(0,0,0,.1)",
            }}
        >
            <img
                src={
                    product.images.length
                        ? "/" + product.images[0].image
                        : "https://placehold.co/150x150"
                }
                width={150}
                height={150}
                style={{
                    objectFit: "cover",
                    borderRadius: 10,
                }}
            />

            <div style={{ flex: 1 }}>
                <h2>{product.name}</h2>

                <p>{product.description}</p>

                <p>
                    <b>Marca:</b> {product.brand?.name}
                </p>

                <p>
                    <b>Categoría:</b> {product.category?.name}
                </p>

                <p>
                    <b>SKU:</b> {product.sku}
                </p>

                <p>
                    <b>Precio:</b> ${product.price}
                </p>

                <p>
                    <b>Stock:</b> {product.stock}
                </p>
            </div>

            <div>
                <button>Editar</button>
            </div>
        </div>
    );
}