import express from "express";
import {AdminController} from "../controllers/adminController.js";

const router = express.Router();

export const adminRoutes = () => {
    router.post('/', AdminController.createAdminAccount);
    router.post('/login', AdminController.loginToAdminAccount);
    router.get('/', AdminController.getAllAdmins);
    router.get('/:id', AdminController.getAdminById);
    router.put('/:id', AdminController.updateAdmin);
    router.delete('/:id', AdminController.deleteAdmin);

    return router;
}