import express from "express";
import * as productsController from '../controller/productsController';

const router = express.Router();

router
    .get('/', productsController.getProducts)
    .get('/:id', productsController.getProductById)
    .post('/', productsController.createProduct)
    .put('/:id', productsController.updateProduct)
    .delete('/:id', productsController.deleteProduct);

export default router;