import express from "express";
import { UsersController } from "../controllers/usersController";

const router = express.Router();

export const usersRoutes = () => {
    router.get('/logout', UsersController.logoutToAccount);

    return router;
}