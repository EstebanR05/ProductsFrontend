import { useState, useEffect } from "react";


// ModalForm.js
export default function ModalForm({ isOpen, onClose, mode, onSubmit, product }) {
    const initialFormState = {
        name: '',
        description: '',
        sku: '',
        brand: '',
        price: '',
        inStock: false,
        imageUrl: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        if (mode === 'add') {
            setFormData(initialFormState);
            setImagePreview(null);
        } else if (product && mode === 'edit') {
            setFormData({
                name: product.name || '',
                description: product.description || '',
                sku: product.sku || '',
                brand: product.brand || '',
                price: product.basePrice || product.price || '',
                inStock: product.inStock || false,
                imageUrl: product.imageUrl || '',
            });

            if (product.imageUrl) {
                const storedImage = localStorage.getItem(`product-image-${product.imageUrl}`);
                if (storedImage) {
                    setImagePreview(storedImage);
                }
            }
        }
    }, [mode, product, isOpen]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result;
                    localStorage.setItem(`product-image-${fileName}`, base64String);

                    setImagePreview(base64String);
                    setFormData(prev => ({
                        ...prev,
                        imageUrl: fileName
                    }));
                };
                reader.readAsDataURL(file);

            } catch (error) {
                console.error('Error processing image:', error);
                alert('Error processing image');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <dialog id="my_modal_3" className="modal bg-black/40" open={isOpen}>
            <div className="modal-box max-w-3xl">
                <button
                    className="btn btn-sm btn-circle bg-base-200 hover:bg-base-300 text-base-content border-0 absolute right-2 top-2"
                    onClick={onClose}
                >
                    ✕
                </button>
                <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Product' : 'Add New Product'}</h3>

                <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <label className="cursor-pointer block">
                            <div className="w-full aspect-square border-2 border-dashed border-base-300 rounded-lg overflow-hidden relative group hover:border-primary">
                                <div className="w-full h-full flex items-center justify-center bg-base-200">
                                    {imagePreview ? (
                                        <div className="w-full h-full relative group">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                style={{
                                                    imageRendering: 'crisp-edges',
                                                    objectPosition: 'center',
                                                    backfaceVisibility: 'hidden',
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-base-300/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                            <div className="absolute inset-0 bg-base-300/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-base-content mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                </svg>
                                                <span className="text-sm text-base-content">Change Image</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-3 group-hover:scale-105 transition-transform duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                            </svg>
                                            <span className="text-sm text-base-content/50">Click to upload image</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                        </label>
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-4">
                        <div className="form-control w-full col-span-2">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">SKU</span>
                            </label>
                            <input
                                type="text"
                                name="sku"
                                value={formData.sku}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Brand</span>
                            </label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Stock Status</span>
                            </label>
                            <div
                                className="input input-bordered w-full h-12 flex items-center cursor-pointer hover:border-primary transition-colors"
                                onClick={() => {
                                    const newValue = !formData.inStock;
                                    setFormData(prev => ({ ...prev, inStock: newValue }));
                                }}
                            >
                                <div className="flex items-center gap-3 w-full px-1">
                                    <div
                                        className={`checkbox checkbox-primary ${formData.inStock ? 'checkbox-checked' : ''}`}
                                        role="checkbox"
                                        aria-checked={formData.inStock}
                                    />
                                    <span className={`text-sm ${formData.inStock ? 'text-primary' : 'text-gray-600'}`}>
                                        {formData.inStock ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-control w-full col-span-2">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="textarea textarea-bordered h-24 w-full"
                                placeholder="Enter product description..."
                            />
                        </div>
                    </div>

                    <div className="col-span-3 flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            className="btn bg-base-200 hover:bg-base-300 text-base-content border-0 transition-colors"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn bg-primary/10 text-primary hover:bg-primary/20 border-0 transition-colors"
                        >
                            {mode === 'edit' ? 'Save Changes' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
