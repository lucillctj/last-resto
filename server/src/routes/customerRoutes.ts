import express from "express";
import { CustomerController } from "../controllers/customerController";
import {verifyAuth} from "../middleware/auth";

const router = express.Router();

export const customerRoutes = () => {
    router.post('/signup', CustomerController.createCustomerAccount);
    router.get('/', CustomerController.getAllCustomers);
    router.get('/dashboard/:id', CustomerController.getCustomerDashboard);
    router.put('/update/:id', CustomerController.updateCustomer);
    // router.delete('/delete/:id', CustomerController.deleteCustomer);

    return router;
}