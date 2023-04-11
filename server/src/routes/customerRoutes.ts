import express from "express";
import { CustomerController } from "../controllers/customerController.js";
import {verifyAuthToken} from "../middleware/auth.js";

const router = express.Router();

export const customerRoutes = () => {
    router.post('/', CustomerController.createCustomerAccount);
    router.post('/login', verifyAuthToken, CustomerController.loginToCustomerAccount);
    router.get('/', CustomerController.getAllCustomers);
    router.get('/:id', CustomerController.getCustomerById);
    router.put('/:id', CustomerController.updateCustomer);
    router.delete('/:id', CustomerController.deleteCustomer);

    return router;
}