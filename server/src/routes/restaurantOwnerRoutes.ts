import express from "express";
import { RestaurantOwnerController } from "../controllers/restaurantOwnerController.js";
import {verifyAuthToken} from "../middleware/auth.js";

const router = express.Router();

export const restaurantOwnerRoutes = () => {
    router.post('/signup-restaurantOwner', RestaurantOwnerController.createRestaurantOwnerAccount);
    router.post('/login-restaurantOwner', verifyAuthToken, RestaurantOwnerController.loginToRestaurantOwnerAccount);
    router.get('/restaurantOwners', RestaurantOwnerController.getAllRestaurantOwners);
    router.get('/restaurantOwner/:id', RestaurantOwnerController.getRestaurantOwnerById);
    router.put('/restaurantOwner/:id', RestaurantOwnerController.updateRestaurantOwner);
    router.delete('/restaurantOwner/:id', RestaurantOwnerController.deleteRestaurantOwner);

    return router;
}