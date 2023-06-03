import express from "express";
import { CustomerController } from "../controllers/customerController";
import {verifyAuth} from "../middleware/auth";

const router = express.Router();

export const customerRoutes = () => {
    router.post('/signup', CustomerController.createCustomerAccount);
    router.get('/dashboard/:id', verifyAuth, CustomerController.getCustomerDashboard);
    router.put('/update/:id', verifyAuth, CustomerController.updateCustomer);
    router.put('/update-product-id/:id', verifyAuth, CustomerController.updateProductId)
    router.get('/:id/product', verifyAuth, CustomerController.getProductIdByUserId)

    return router;
}