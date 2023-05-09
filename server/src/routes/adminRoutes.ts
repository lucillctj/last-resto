import express from "express";
import {AdminController} from "../controllers/adminController";

const router = express.Router();

export const adminRoutes = () => {
    router.post('/', AdminController.createAdminAccount);
    router.post('/login', AdminController.loginToAdminAccount);
    router.get('/', AdminController.getAllAdmins);
    router.get('/dashboard/:id', AdminController.getAdminDashboard);
    router.put('/update/:id', AdminController.updateAdmin);
    router.delete('/delete/:id', AdminController.deleteAdmin);

    return router;
}