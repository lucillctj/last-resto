import express from "express";
import {ProductController} from "../controllers/productController";
import {verifyAuth} from "../middleware/auth";

const router = express.Router();

export const productRoutes = () => {
    router.post('/create', verifyAuth, ProductController.createProduct);
    // router.get('/', ProductController.getAllProducts);
    router.get('/restaurant/:id', verifyAuth, ProductController.getProductsByRestaurantId);
    router.get('/:id/restaurant', verifyAuth, ProductController.getRestaurantIdByProductId);
    router.get('/:id', verifyAuth, ProductController.getProductById);
    router.put('/update/:id', verifyAuth, ProductController.updateProduct);
    router.delete('/delete/:id', verifyAuth, ProductController.deleteProduct);

    return router;
}