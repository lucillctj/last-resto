import express from "express";
import { RestaurantOwnerController } from "../controllers/restaurantOwnerController.js";
import {verifyAuth} from "../middleware/auth.js";

const router = express.Router();

export const restaurantOwnerRoutes = () => {
    router.post('/', RestaurantOwnerController.createRestaurantOwnerAccount);
    router.post('/login', verifyAuth, RestaurantOwnerController.loginToRestaurantOwnerAccount);
    router.get('/', RestaurantOwnerController.getAllRestaurantOwners);
    router.get('/:id', RestaurantOwnerController.getRestaurantOwnerById);
    router.put('/:id', RestaurantOwnerController.updateRestaurantOwner);
    router.delete('/:id', RestaurantOwnerController.deleteRestaurantOwner);

    return router;
}