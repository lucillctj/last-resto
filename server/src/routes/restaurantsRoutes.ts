import express from "express";
import {RestaurantsController} from "../controllers/restaurantsController";

const router = express.Router();

export const restaurantsRoutes = () => {
    router.get('/get-restaurants', RestaurantsController.getAllRestaurants);
    router.get('/get-restaurant/:id', RestaurantsController.getRestaurantById);
    router.post('/create-restaurant', RestaurantsController.createRestaurant);
    router.put('/restaurant/:id', RestaurantsController.updateRestaurant);
    router.delete('/restaurant/:id', RestaurantsController.deleteRestaurant);

    return router;
}