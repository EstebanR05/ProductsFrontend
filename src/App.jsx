import './App.css'
import Navbar from './components/Navbar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm';
import { useState, useEffect } from 'react';
import { showSuccess, showError, showConfirm } from './utils/notifications';
import { ENDPOINTS } from './config/constants';

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => 
                product.name?.toLowerCase().includes(searchTerm) ||
                product.sku?.toLowerCase().includes(searchTerm) ||
                product.brand?.toLowerCase().includes(searchTerm) ||
                product.description?.toLowerCase().includes(searchTerm)
            );
            setFilteredProducts(filtered);
        }
    }, [searchTerm, products]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(ENDPOINTS.PRODUCTS);
            const data = await response.json();
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            showError('Error loading products');
        }
    };

    const handleOpen = (mode, product = null) => {
        setModalMode(mode);
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleSubmit = async (formData) => {
        try {
            const apiData = {
                name: formData.name,
                description: formData.description,
                sku: formData.sku,
                basePrice: Number(formData.price),
                brand: formData.brand,
                inStock: formData.inStock,
                stock: formData.inStock,
                imageUrl: formData.imageUrl
            };

            const response = await fetch(
                `${ENDPOINTS.PRODUCTS}${modalMode === 'edit' ? `/${selectedProduct._id}` : ''}`, 
                {
                    method: modalMode === 'add' ? 'POST' : 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(apiData),
                }
            );
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Error processing request');
            }

            setIsOpen(false);
            fetchProducts();
            showSuccess(modalMode === 'add' ? 'Product created successfully' : 'Product updated successfully');
            
        } catch (error) {
            console.error('Error:', error);
            showError(error.message || 'There was an error processing your request');
        }
    };

    const handleDelete = async (productId) => {
        try {
            const confirmed = await showConfirm(
                'Are you sure?',
                'This action cannot be undone!'
            );

            if (!confirmed) return;

            const response = await fetch(`${ENDPOINTS.PRODUCTS}/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Error deleting product');
            }

            fetchProducts();
            showSuccess('Product deleted successfully');
            
        } catch (error) {
            console.error('Error:', error);
            showError(error.message || 'Error deleting product');
        }
    };

    return (
        <>
            <div className="py-5 px-5">
                <Navbar 
                    onOpen={() => handleOpen('add')} 
                    onSearch={handleSearch}
                />
                <TableList 
                    products={filteredProducts}
                    onOpen={(product) => handleOpen('edit', product)}
                    onDelete={handleDelete}
                />
                <ModalForm
                    isOpen={isOpen}
                    onClose={() => {
                        setIsOpen(false);
                        setSelectedProduct(null);
                    }}
                    mode={modalMode}
                    onSubmit={handleSubmit}
                    product={selectedProduct}
                />
            </div>
        </>
    )
}

export default App
