import express from "express";
import { UsersController } from "../controllers/usersController";
import {verifyAuthToken} from "../middleware/auth";

const router = express.Router();

export const usersRoutes = () => {
    router.get('/get-users', UsersController.createUserAccount);
    router.get('/get-users', verifyAuthToken, UsersController.loginToUserAccount);
    router.get('/get-users', verifyAuthToken, UsersController.getAllUsers);
    router.get('/get-user/:id', UsersController.getUserById);
    // router.post('/create-user', UsersController.createUser);
    router.put('/user/:id', UsersController.updateUser);
    router.delete('/user/:id', UsersController.deleteUser);

    return router;
}