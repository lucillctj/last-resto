import express from "express";
import { CustomerController } from "../controllers/customerController.js";
import {verifyAuthToken} from "../middleware/auth.js";

const router = express.Router();

export const customerRoutes = () => {
    router.post('/signup-customer', CustomerController.createCustomerAccount);
    router.post('/login-customer', verifyAuthToken, CustomerController.loginToCustomerAccount);
    router.get('/customers', CustomerController.getAllCustomers);
    router.get('/customer/:id', CustomerController.getCustomerById);
    router.put('/customer/:id', CustomerController.updateCustomer);
    router.delete('/customer/:id', CustomerController.deleteCustomer);

    return router;
}