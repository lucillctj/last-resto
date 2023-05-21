import express from "express";
import {verifyAuth} from "../middleware/auth";
import {UserController} from "../controllers/userController";
import {CustomerController} from "../controllers/customerController";

const router = express.Router();

export const usersRoutes = () => {
    router.post('/login', UserController.loginToUserAccount);
    router.get('/logout', UserController.logoutToAccount);
    router.delete('/delete/:id', UserController.deleteUser);

    return router;
}