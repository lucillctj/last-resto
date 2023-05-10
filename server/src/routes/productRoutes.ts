import express from "express";
import { ProductController } from "../controllers/productController";

const router = express.Router();

export const productRoutes = () => {
    router.post('/signup', ProductController.createProduct);
    router.get('/', ProductController.getAllProducts);
    router.get('/dashboard/:id', ProductController.getProductDashboard);
    router.put('/update/:id', ProductController.updateProduct);
    router.delete('/delete/:id', ProductController.deleteProduct);

    return router;
}