import express from "express";
import { RestaurantOwnerController } from "../controllers/restaurantOwnerController";
import {verifyAuth} from "../middleware/auth";

const router = express.Router();

export const restaurantOwnerRoutes = () => {
    router.post('/signup', RestaurantOwnerController.createRestaurantOwnerAccount);
    router.post('/login', verifyAuth, RestaurantOwnerController.loginToRestaurantOwnerAccount);
    router.get('/', RestaurantOwnerController.getAllRestaurantOwners);
    router.get('/dashboard/:id', RestaurantOwnerController.getRestaurantOwnerDashboard);
    router.put('/update/:id', RestaurantOwnerController.updateRestaurantOwner);
    router.delete('/delete/:id', RestaurantOwnerController.deleteRestaurantOwner);

    return router;
}