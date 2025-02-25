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
            if (modalMode === 'add') {
                const response = await fetch('http://localhost:4000/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                
                if (!response.ok) throw new Error('Error creating product');
                
            } else {
                const response = await fetch(`http://localhost:4000/api/products/${selectedProduct._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                
                if (!response.ok) throw new Error('Error updating product');
            }

            // Cerrar modal y refrescar la tabla
            setIsOpen(false);
            // Forzar actualización de la tabla
            window.location.reload();
            
        } catch (error) {
            console.error('Error:', error);
            alert('There was an error processing your request');
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
