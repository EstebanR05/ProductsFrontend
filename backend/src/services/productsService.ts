import { Request, Response } from 'express';
import productSchema from '../schemas/productSchema';

export const getProductsService = async (_req: Request, res: Response) => {
    try {
        const products = await productSchema.find({});
        return res.json(products);
    } catch (error) {
        return handleError(res, error, 'Error getting products');
    }
};

export const getProductByIdService = async (req: Request, res: Response) => {
    try {
        const product = await productSchema.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json(product);
    } catch (error) {
        return handleError(res, error, 'Error getting product');
    }
};

export const createProductService = async (req: Request, res: Response) => {
    try {
        const newProduct = new productSchema(req.body);
        const savedProduct = await newProduct.save();
        return res.status(201).json(savedProduct);
    } catch (error: any) {
        if (error.code === 11000 && error.keyPattern?.sku) {
            return res.status(400).json({
                message: 'A product with this SKU already exists',
                field: 'sku'
            });
        }
        return handleError(res, error, 'Error creating product');
    }
};

export const updateProductService = async (req: Request, res: Response) => {
    try {
        const updatedProduct = await productSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json(updatedProduct);
    } catch (error: any) {
        if (error.code === 11000 && error.keyPattern?.sku) {
            return res.status(400).json({
                message: 'A product with this SKU already exists',
                field: 'sku'
            });
        }
        return handleError(res, error, 'Error updating product');
    }
};

export const deleteProductService = async (req: Request, res: Response) => {
    try {
        const deletedProduct = await productSchema.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        return handleError(res, error, 'Error deleting product');
    }
};

export const handleError = (res: Response, error: any, message: string) => {
    console.error(message, error);
    return res.status(500).json({ error: message });
};
