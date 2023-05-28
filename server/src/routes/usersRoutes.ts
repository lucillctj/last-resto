import express from "express";
import {UserController} from "../controllers/userController";

const router = express.Router();

export const usersRoutes = () => {
    router.post('/login', UserController.loginToUserAccount);
    router.get('/logout', UserController.logoutToAccount);
    router.delete('/delete/:id', UserController.deleteUser);

    return router;
}