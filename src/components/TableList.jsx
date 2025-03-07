import { useState, useEffect } from 'react';

export default function TableList({ products, onOpen, onDelete }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const ImageComponent = ({ imageUrl, productName }) => {
        const [imageSrc, setImageSrc] = useState(null);

        useEffect(() => {
            if (imageUrl) {
                const storedImage = localStorage.getItem(`product-image-${imageUrl}`);
                if (storedImage) {
                    setImageSrc(storedImage);
                }
            }
        }, [imageUrl]);

        return (
            <div className="w-full h-48 rounded-t-lg overflow-hidden bg-base-200 relative group">
                {imageSrc ? (
                    <div className="w-full h-full">
                        <img
                            src={imageSrc}
                            alt={productName}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            style={{
                                imageRendering: 'crisp-edges',  
                                objectPosition: 'center',       
                                backfaceVisibility: 'hidden',   
                            }}
                        />
                        {/* Overlay sutil para mejorar contraste */}
                        <div className="absolute inset-0 bg-gradient-to-t from-base-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-base-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-base-content/50 mt-2">No image available</span>
                    </div>
                )}
            </div>
        );
    };

    const handleDeleteClick = (product) => {
        onDelete(product._id);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {products.map((product) => (
                <div key={product._id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all">
                    <figure className="relative group">
                        <ImageComponent
                            imageUrl={product.imageUrl}
                            productName={product.name}
                        />
                        <div className="absolute inset-0 bg-base-300/50 group-hover:bg-base-300/80 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                                className="btn btn-circle glass text-base-content hover:bg-base-100/20"
                                onClick={() => onOpen(product)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </button>
                        </div>
                    </figure>
                    <div className="card-body bg-base-100">
                        <div className="flex justify-between items-start">
                            <h2 className="card-title text-lg">{product.name}</h2>
                            <div className="badge bg-accent/10 text-accent hover:bg-accent/20 transition-colors border-0 badge-lg font-semibold">
                                ${product.price || product.basePrice}
                            </div>
                        </div>

                        <p className="text-sm text-base-content/70 line-clamp-2">
                            {product.description || 'No description available'}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.sku && (
                                <div className="badge bg-neutral/10 text-neutral-content hover:bg-neutral/20 transition-colors border-0">
                                    SKU: {product.sku}
                                </div>
                            )}
                            {product.brand && (
                                <div className="badge bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors border-0">
                                    {product.brand}
                                </div>
                            )}
                            <div className={`badge border-0 transition-colors ${product.inStock
                                ? 'bg-success/10 text-success hover:bg-success/20'
                                : 'bg-base-content/10 text-base-content/70 hover:bg-base-content/20'
                                }`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </div>
                        </div>

                        <div className="card-actions justify-end mt-4">
                            <button
                                className="btn btn-sm bg-error/10 text-error hover:bg-error/20 border-0"
                                onClick={() => handleDeleteClick(product)}
                            >
                                Delete
                            </button>
                            <button
                                className="btn btn-sm bg-primary/10 text-primary hover:bg-primary/20 border-0"
                                onClick={() => onOpen(product)}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}