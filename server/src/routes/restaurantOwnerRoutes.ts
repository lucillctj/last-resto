import express from "express";
import { RestaurantOwnerController } from "../controllers/restaurantOwnerController";
import {verifyAuth} from "../middleware/auth";

const router = express.Router();

export const restaurantOwnerRoutes = () => {
    router.post('/signup', RestaurantOwnerController.createRestaurantOwnerAccount);
    // router.get('/', RestaurantOwnerController.getAllRestaurantOwners);
    router.get('/dashboard/:id', verifyAuth, RestaurantOwnerController.getRestaurantOwnerDashboard);
    router.put('/update/:id', verifyAuth, RestaurantOwnerController.updateRestaurantOwner);
    return router;
}