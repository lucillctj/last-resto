import express from "express";
import {verifyAuth} from "../middleware/auth";
import {UserController} from "../controllers/userController";

const router = express.Router();

export const usersRoutes = () => {
    router.post('/login', UserController.loginToUserAccount);
    router.get('/logout', UserController.logoutToAccount);

    return router;
}