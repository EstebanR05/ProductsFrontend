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

    return (
        <>
            <div className="overflow-x-auto mt-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="hover">
                        {products.map((product) => (
                            <tr key={product._id} className="hover">
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>${product.price || product.basePrice}</td>
                                <td>
                                    <button
                                        className={`btn rounded-full w-20 ${product.inStock ? 'btn-primary' : 'btn-outline btn-primary'}`}>
                                        {product.inStock ? 'In Stock' : 'Out Stock'}
                                    </button>
                                </td>
                                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td className="flex gap-2">
                                    <button className="btn btn-secondary" onClick={() => onOpen(product)}>Update</button>
                                    <button className="btn btn-accent">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}