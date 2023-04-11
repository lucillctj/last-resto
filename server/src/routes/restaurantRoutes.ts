import express from "express";
import {RestaurantController} from "../controllers/restaurantController.js";

const router = express.Router();

export const restaurantRoutes = () => {
    router.get('/get-restaurants', RestaurantController.getAllRestaurants);
    router.get('/get-restaurant/:id', RestaurantController.getRestaurantById);
    router.post('/create-restaurant', RestaurantController.createRestaurant);
    router.put('/restaurant/:id', RestaurantController.updateRestaurant);
    router.delete('/restaurant/:id', RestaurantController.deleteRestaurant);

    return router;
}