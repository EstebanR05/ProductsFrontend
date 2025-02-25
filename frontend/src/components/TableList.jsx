import { useState, useEffect } from 'react';

export default function TableList({ products, onOpen, onDelete }) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

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
                // Intentar obtener la imagen del localStorage
                const storedImage = localStorage.getItem(`product-image-${imageUrl}`);
                if (storedImage) {
                    setImageSrc(storedImage);
                }
            }
        }, [imageUrl]);

        return (
            <div className="w-full h-48 rounded-t-lg overflow-hidden bg-gray-100">
                {imageSrc ? (
                    <img 
                        src={imageSrc}
                        alt={productName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </div>
        );
    };

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowConfirmDialog(true);
    };

    const confirmDelete = async () => {
        if (productToDelete) {
            await onDelete(productToDelete._id);
            setShowConfirmDialog(false);
            setProductToDelete(null);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                {products.map((product) => (
                    <div key={product._id} className="card bg-base-100 shadow-xl">
                        <ImageComponent 
                            imageUrl={product.imageUrl} 
                            productName={product.name}
                        />
                        <div className="card-body">
                            <div className="flex justify-between items-start">
                                <h2 className="card-title text-lg">{product.name}</h2>
                                <div className="badge badge-lg">
                                    ${product.price || product.basePrice}
                                </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {product.description || 'No description available'}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-2">
                                {product.sku && (
                                    <div className="badge badge-outline">
                                        SKU: {product.sku}
                                    </div>
                                )}
                                {product.brand && (
                                    <div className="badge badge-outline">
                                        {product.brand}
                                    </div>
                                )}
                                <div className={`badge ${product.inStock ? 'badge-primary' : 'badge-ghost'}`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </div>
                            </div>

                            <div className="card-actions justify-end mt-4">
                                <button 
                                    className="btn btn-sm btn-secondary" 
                                    onClick={() => onOpen(product)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-sm btn-error"
                                    onClick={() => handleDeleteClick(product)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de confirmación */}
            <dialog id="confirm_dialog" className={`modal ${showConfirmDialog ? 'modal-open' : ''}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Delete</h3>
                    <p className="py-4">
                        Are you sure you want to delete "{productToDelete?.name}"?
                        This action cannot be undone.
                    </p>
                    <div className="modal-action">
                        <button 
                            className="btn btn-ghost"
                            onClick={() => setShowConfirmDialog(false)}
                        >
                            Cancel
                        </button>
                        <button 
                            className="btn btn-error"
                            onClick={confirmDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}