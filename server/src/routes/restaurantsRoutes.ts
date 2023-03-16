import express from "express";
import {RestaurantsController} from "../controllers/restaurantsController";

const router = express.Router();

export const restaurantsRoutes = () => {
    router.get('/get-users', RestaurantsController.getAllRestaurants);
    router.get('/get-user/:id', RestaurantsController.getRestaurantById);
    router.post('/create-user', RestaurantsController.createRestaurant);
    router.put('/user/:id', RestaurantsController.updateRestaurant);
    router.delete('/user/:id', RestaurantsController.deleteRestaurant);

    return router;
}