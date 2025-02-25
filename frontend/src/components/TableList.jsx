import { useState, useEffect } from 'react';

export default function TableList({ onOpen }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>SKU</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {products.map((product) => (
                            <tr key={product._id} className="hover">
                                <td>
                                    <div className="w-12 h-12 border-2 border-gray-200 rounded-lg overflow-hidden">
                                        {product.imageUrl ? (
                                            <img 
                                                src={product.imageUrl} 
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="text-xs">{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.description || '-'}</td>
                                <td>{product.sku || '-'}</td>
                                <td>{product.brand || '-'}</td>
                                <td>${product.price || product.basePrice}</td>
                                <td>
                                    <button
                                        className={`btn btn-sm rounded-full w-20 ${product.inStock ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                                        {product.inStock ? 'In Stock' : 'Out Stock'}
                                    </button>
                                </td>
                                <td className="text-xs">{formatDate(product.createdAt)}</td>
                                <td className="text-xs">{formatDate(product.updatedAt)}</td>
                                <td className="flex gap-2">
                                    <button 
                                        className="btn btn-sm btn-secondary" 
                                        onClick={() => onOpen(product)}
                                    >
                                        Update
                                    </button>
                                    <button className="btn btn-sm btn-accent">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}