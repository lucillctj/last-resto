import express from "express";
import { CustomerController } from "../controllers/customerController.js";
import {verifyAuthTokenCookies} from "../middleware/auth.js";

const router = express.Router();

export const customerRoutes = () => {
    router.post('/', CustomerController.createCustomerAccount);
    router.post('/login', verifyAuthTokenCookies, CustomerController.loginToCustomerAccount);
    router.get('/', CustomerController.getAllCustomers);
    router.get('/:id', CustomerController.getCustomerById);
    router.put('/:id', CustomerController.updateCustomer);
    router.delete('/:id', CustomerController.deleteCustomer);

    return router;
}