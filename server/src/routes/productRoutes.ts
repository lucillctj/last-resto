import express from "express";
import { ProductController } from "../controllers/productController";
import {RestaurantController} from "../controllers/restaurantController";

const router = express.Router();

export const productRoutes = () => {
    router.post('/create', ProductController.createProduct);
    router.get('/', ProductController.getAllProducts);
    router.get('/restaurant/:id', ProductController.getProductsByRestaurantId);
    router.get('/user/:id', ProductController.getProductsByUserId);
    // router.get('/dashboard/:id', ProductController.getProductDashboard);
    router.put('/update/:id', ProductController.updateProduct);
    router.delete('/delete/:id', ProductController.deleteProduct);

    return router;
}