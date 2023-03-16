import express from "express";
import { ProductsController } from "../controllers/usersController";

const router = express.Router();

export const usersRoutes = () => {
    router.get('/get-users', ProductsController.getAllUsers);
    router.get('/get-user/:id', ProductsController.getUserById);
    router.post('/create-user', ProductsController.createUser);
    router.put('/user/:id', ProductsController.updateUser);
    router.delete('/user/:id', ProductsController.deleteUser);

    return router;
}