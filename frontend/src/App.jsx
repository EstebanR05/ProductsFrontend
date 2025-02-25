import './App.css'
import Navbar from './components/Navbar'
import TableList from './components/TableList'
import ModalForm from './components/ModalForm';
import { useState } from 'react';

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleOpen = (mode, product = null) => {
        setModalMode(mode);
        setSelectedProduct(product);
        setIsOpen(true);
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

            const response = await fetch(`http://localhost:4000/api/products${modalMode === 'edit' ? `/${selectedProduct._id}` : ''}`, {
                method: modalMode === 'add' ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Error processing request');
            }

            setIsOpen(false);
            window.location.reload();
            
        } catch (error) {
            console.error('Error:', error);
            alert(error.message || 'There was an error processing your request');
        }
    };

    return (
        <>
            <div className="py-5 px-5">
                <Navbar onOpen={() => handleOpen('add')} />
                <TableList onOpen={(product) => handleOpen('edit', product)} />
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
