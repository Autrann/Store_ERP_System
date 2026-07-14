import { router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import type { ChangeEvent } from 'react';

interface ProductImage {
    id: number;
    image: string;
}

interface Props {
    productId: number;
    images: ProductImage[];
    editing: boolean;
}

export default function ProductImageViewer({
    productId,
    images,
    editing,
}: Props) {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [uploading, setUploading] = useState(false);
    const inputFile = useRef<HTMLInputElement>(null);

    const selectedImageIndex = Math.min(
        selectedImage,
        Math.max(images.length - 1, 0),
    );
    const selectedProductImage = images[selectedImageIndex];

    function openViewer(): void {
        setSelectedImage(0);
        setViewerOpen(true);
    }

    function uploadImage(event: ChangeEvent<HTMLInputElement>): void {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        router.post(
            `/products/${productId}/images`,
            { image: file },
            {
                forceFormData: true,
                preserveScroll: true,
                onStart: () => setUploading(true),
                onFinish: () => setUploading(false),
            },
        );

        event.target.value = '';
    }

    function deleteImage(id: number): void {
        if (
            !window.confirm(
                '¿Eliminar esta imagen?\n\nEsta acción no se puede deshacer.',
            )
        ) {
            return;
        }

        router.delete(`/products/images/${id}`, {
            preserveScroll: true,
        });
    }

    return (
        <>
            <div className="group relative h-36 w-36 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm">
                <button
                    type="button"
                    className="h-full w-full cursor-pointer"
                    onClick={openViewer}
                    aria-label={
                        images.length
                            ? 'Ver imágenes del producto'
                            : 'Gestionar imágenes del producto'
                    }
                >
                    <img
                        src={
                            images.length
                                ? `/storage/${images[0].image}`
                                : 'https://placehold.co/300x300?text=Sin+imagen'
                        }
                        alt="Imagen del producto"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                </button>

                {images.length > 1 && (
                    <div className="pointer-events-none absolute right-2 bottom-2 rounded-full bg-black/75 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                        {images.length} fotos
                    </div>
                )}

                {editing && (
                    <button
                        type="button"
                        onClick={openViewer}
                        className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/55 text-sm font-medium text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100"
                        aria-label="Editar imágenes del producto"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-7 w-7"
                            aria-hidden="true"
                        >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                        </svg>
                        Editar fotos
                    </button>
                )}
            </div>

            {viewerOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-sm sm:p-6"
                    onClick={() => setViewerOpen(false)}
                    role="presentation"
                >
                    <div
                        className="max-h-[86vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Imágenes del producto"
                    >
                        <header className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Imágenes del producto
                                    </h2>
                                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                        {images.length}{' '}
                                        {images.length === 1
                                            ? 'imagen'
                                            : 'imágenes'}
                                    </span>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                    {editing
                                        ? 'Selecciona, agrega o elimina imágenes.'
                                        : 'Selecciona una miniatura para verla en detalle.'}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setViewerOpen(false)}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                                aria-label="Cerrar visor"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                >
                                    <path d="m6 6 12 12M18 6 6 18" />
                                </svg>
                            </button>
                        </header>

                        <div className="grid lg:grid-cols-[minmax(0,1fr)_15rem]">
                            <section className="bg-slate-100 p-4 sm:p-5">
                                <div className="relative flex h-[min(45vh,400px)] items-center justify-center overflow-hidden rounded-xl bg-slate-900 shadow-inner">
                                    {selectedProductImage ? (
                                        <img
                                            src={`/storage/${selectedProductImage.image}`}
                                            alt={`Imagen ${selectedImageIndex + 1} del producto`}
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <div className="flex max-w-xs flex-col items-center px-6 text-center text-slate-300">
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                className="mb-3 h-11 w-11"
                                                aria-hidden="true"
                                            >
                                                <rect
                                                    width="18"
                                                    height="14"
                                                    x="3"
                                                    y="5"
                                                    rx="2"
                                                />
                                                <circle
                                                    cx="8.5"
                                                    cy="10"
                                                    r="1.5"
                                                />
                                                <path d="m21 15-5-5L5 19" />
                                            </svg>
                                            <p className="font-medium">
                                                Aún no hay imágenes
                                            </p>
                                            {editing && (
                                                <p className="mt-1 text-sm text-slate-400">
                                                    Agrega la primera imagen
                                                    desde el panel lateral.
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {selectedProductImage && editing && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteImage(
                                                    selectedProductImage.id,
                                                )
                                            }
                                            className="absolute right-3 bottom-3 inline-flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            >
                                                <path d="M3 6h18M8 6V4h8v2m-7 0 1 14h4l1-14" />
                                            </svg>
                                            Eliminar
                                        </button>
                                    )}
                                </div>

                                {images.length > 1 && (
                                    <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                                        {images.map((image, index) => (
                                            <button
                                                key={image.id}
                                                type="button"
                                                onClick={() =>
                                                    setSelectedImage(index)
                                                }
                                                className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-20 ${
                                                    selectedImageIndex === index
                                                        ? 'border-slate-900 ring-2 ring-slate-900/15'
                                                        : 'border-white hover:border-slate-300'
                                                }`}
                                                aria-label={`Ver imagen ${index + 1}`}
                                            >
                                                <img
                                                    src={`/storage/${image.image}`}
                                                    alt={`Miniatura ${index + 1} del producto`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </section>

                            <aside className="border-t border-gray-100 bg-white p-5 lg:border-t-0 lg:border-l">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-900">
                                        Galería
                                    </h3>
                                    {editing && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                inputFile.current?.click()
                                            }
                                            disabled={uploading}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            >
                                                <path d="M12 5v14M5 12h14" />
                                            </svg>
                                            {uploading
                                                ? 'Subiendo...'
                                                : 'Agregar'}
                                        </button>
                                    )}
                                </div>

                                {images.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-3">
                                        {images.map((image, index) => (
                                            <div
                                                key={image.id}
                                                className="group relative"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedImage(index)
                                                    }
                                                    className={`aspect-square w-full overflow-hidden rounded-lg border-2 transition ${
                                                        selectedImageIndex ===
                                                        index
                                                            ? 'border-slate-900 ring-2 ring-slate-900/10'
                                                            : 'border-transparent hover:border-slate-300'
                                                    }`}
                                                    aria-label={`Seleccionar imagen ${index + 1}`}
                                                >
                                                    <img
                                                        src={`/storage/${image.image}`}
                                                        alt={`Imagen ${index + 1} del producto`}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </button>

                                                {editing && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteImage(
                                                                image.id,
                                                            )
                                                        }
                                                        className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-600 text-sm font-bold text-white opacity-0 shadow-sm transition group-hover:opacity-100 focus:opacity-100"
                                                        aria-label={`Eliminar imagen ${index + 1}`}
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 text-center text-sm text-gray-500">
                                        Sin imágenes para mostrar.
                                    </div>
                                )}

                                {editing && (
                                    <p className="mt-5 text-xs leading-5 text-gray-500">
                                        Formatos permitidos: JPG, PNG o WEBP.
                                        Tamaño máximo: 4 MB.
                                    </p>
                                )}

                                <input
                                    ref={inputFile}
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    className="hidden"
                                    onChange={uploadImage}
                                />
                            </aside>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
