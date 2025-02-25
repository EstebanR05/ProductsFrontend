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
            // Limpiar el formulario cuando se abre en modo 'add'
            setFormData(initialFormState);
            setImagePreview(null);
        } else if (product && mode === 'edit') {
            // Llenar el formulario con los datos del producto en modo 'edit'
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
                setImagePreview(`/assets/products/${product.imageUrl}`);
            }
        }
    }, [mode, product, isOpen]); // Agregamos isOpen como dependencia

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
            // Crear un nombre de archivo único
            const fileName = `${Date.now()}-${file.name}`;
            
            // Guardar la URL de la imagen en el estado
            setFormData(prev => ({
                ...prev,
                imageUrl: fileName
            }));

            // Crear preview de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Copiar el archivo a la carpeta public/assets/products
            // Nota: Esto es una simulación, en realidad necesitarías mover el archivo manualmente
            console.log('Archivo a copiar en public/assets/products/:', fileName);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <dialog id="my_modal_3" className="modal bg-black/40" open={isOpen}>
            <div className="modal-box max-w-3xl">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <h3 className="font-bold text-lg py-4">{mode === 'edit' ? 'Edit Product' : 'Add New Product'}</h3>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 flex justify-center mb-4">
                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden flex items-center justify-center relative group">
                            {imagePreview ? (
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white text-sm">Change Image</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control col-span-2">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="textarea textarea-bordered h-24"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">SKU</span>
                        </label>
                        <input
                            type="text"
                            name="sku"
                            value={formData.sku}
                            onChange={handleInputChange}
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Brand</span>
                        </label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleInputChange}
                            className="input input-bordered"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">In Stock</span>
                            <input
                                type="checkbox"
                                name="inStock"
                                checked={formData.inStock}
                                onChange={handleInputChange}
                                className="checkbox checkbox-primary"
                            />
                        </label>
                    </div>

                    <div className="col-span-2 flex justify-end gap-2 mt-4">
                        <button type="button" className="btn btn-ghost" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {mode === 'edit' ? 'Save Changes' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
