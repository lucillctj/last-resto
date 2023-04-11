import express from "express";
import { ProductController } from "../controllers/productController.js";

const router = express.Router();

export const productRoutes = () => {
    router.get('/get-products', ProductController.getAllProducts);
    router.get('/get-product/:id', ProductController.getProductById);
    router.post('/create-product', ProductController.createProduct);
    router.put('/product/:id', ProductController.updateProduct);
    router.delete('/product/:id', ProductController.deleteProduct);

    return router;
}