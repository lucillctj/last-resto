import express from "express";
import {RestaurantController} from "../controllers/restaurantController.js";

const router = express.Router();

export const restaurantRoutes = () => {
    router.get('/', RestaurantController.getAllRestaurants);
    router.get('/:id', RestaurantController.getRestaurantById);
    router.post('/', RestaurantController.createRestaurant);
    router.put('/:id', RestaurantController.updateRestaurant);
    router.delete('/:id', RestaurantController.deleteRestaurant);

    return router;
}