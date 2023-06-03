import express from "express";
import {UserController} from "../controllers/userController";
import {verifyAuth} from "../middleware/auth";

const router = express.Router();

export const usersRoutes = () => {
    router.post('/login', UserController.loginToUserAccount);
    router.get('/logout', UserController.logoutToAccount);
    router.delete('/delete/:id', verifyAuth, UserController.deleteUser);

    return router;
}