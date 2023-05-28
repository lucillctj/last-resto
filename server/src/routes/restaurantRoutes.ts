import express from "express";
import {RestaurantController} from "../controllers/restaurantController";

const router = express.Router();

export const restaurantRoutes = () => {
    router.post('/create', RestaurantController.createRestaurant);
    router.get('/', RestaurantController.getAllRestaurants);
    router.get('/user/:id', RestaurantController.getRestaurantByUserId);
    router.get('/dashboard/:id', RestaurantController.getRestaurantDashboard);
    router.put('/update/:id', RestaurantController.updateRestaurant);
    router.put('/update-availability/:id', RestaurantController.updateAvailability);
    router.delete('/delete/:id', RestaurantController.deleteRestaurant);

    return router;
}