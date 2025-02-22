import * as productService from '../services/productsService';
import { Request, Response } from 'express';

export const getProducts = async (_req: Request, res: Response) => {
    return await productService.getProductsService(_req, res);
};

export const getProductById = async (req: Request, res: Response) => {
    return await productService.getProductByIdService(req, res);
};

export const createProduct = async (req: Request, res: Response) => {
    return await productService.createProductService(req, res);
};

export const updateProduct = async (req: Request, res: Response) => {
    return await productService.updateProductService(req, res);
};

export const deleteProduct = async (req: Request, res: Response) => {
    return await productService.deleteProductService(req, res);
};
