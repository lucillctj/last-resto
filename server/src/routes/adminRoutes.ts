import express from "express";
import {AdminController} from "../controllers/adminController.js";
import {verifyAuthToken} from "../middleware/auth.js";

const router = express.Router();

export const adminRoutes = () => {
    router.post('/signup-admin', AdminController.createAdminAccount);
    router.post('/login-admin', verifyAuthToken, AdminController.loginToAdminAccount);
    router.get('/admins', AdminController.getAllAdmins);
router.get('/admin/:id', AdminController.getAdminById);
    router.put('/admin/:id', AdminController.updateAdmin);
    router.delete('/admin/:id', AdminController.deleteAdmin);

    return router;
}