import express from "express";
import { ProductsController } from "../controllers/productsController";

const router = express.Router();

export const productsRoutes = () => {
    router.get('/get-products', ProductsController.getAllProducts);
    router.get('/get-product/:id', ProductsController.getProductById);
    router.post('/create-product', ProductsController.createProduct);
    router.put('/product/:id', ProductsController.updateProduct);
    router.delete('/product/:id', ProductsController.deleteProduct);

    return router;
}