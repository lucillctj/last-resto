import express from "express";
import { ProductController } from "../controllers/productController.js";

const router = express.Router();

export const productRoutes = () => {
    router.get('/', ProductController.getAllProducts);
    router.get('/:id', ProductController.getProductById);
    router.post('/', ProductController.createProduct);
    router.put('/:id', ProductController.updateProduct);
    router.delete('/:id', ProductController.deleteProduct);

    return router;
}