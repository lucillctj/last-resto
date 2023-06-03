import express from "express";
import {RestaurantController} from "../controllers/restaurantController";
import {verifyAuth} from "../middleware/auth";

const router = express.Router();

export const restaurantRoutes = () => {
    router.post('/create', verifyAuth, RestaurantController.createRestaurant);
    router.get('/', RestaurantController.getAllRestaurants);
    router.get('/user/:id', verifyAuth, RestaurantController.getRestaurantByUserId);
    router.get('/dashboard/:id', verifyAuth, RestaurantController.getRestaurantDashboard);
    router.put('/update/:id', verifyAuth, RestaurantController.updateRestaurant);
    router.put('/update-availability/:id', verifyAuth, RestaurantController.updateAvailability);
    router.delete('/delete/:id', verifyAuth, RestaurantController.deleteRestaurant);

    return router;
}