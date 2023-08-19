import {Request, Response} from "express";
import {pool} from "../app";
import {Restaurant} from "../models/restaurant";
import {QueryResult} from "pg";

export class RestaurantController {
    public static async createRestaurant(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const requestId = parseInt(req.params.user);
        const restaurant: Restaurant = {
            name: body.name,
            description: body.description,
            address: body.address,
            postCode: body.post_code,
            city: body.city,
            phone: body.phone,
            website: body.website || null,
            isAvailable: body.is_available,
            restaurantOwnerId: requestId
        };
        try {
            if (restaurant.name !== '' && restaurant.description !== '' && restaurant.address !== '' && restaurant.postCode !== '' && restaurant.city !== '' && restaurant.phone !== '' && restaurant.restaurantOwnerId! >=1 && (Object.keys(body).length === 7 || 8)
            ) {
                const sql = `INSERT INTO restaurants (name, description, address, post_code, city, phone, website, is_available, restaurant_owner_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const params = [restaurant.name, restaurant.description, restaurant.address, restaurant.postCode, restaurant.city, restaurant.phone, restaurant.website, false, restaurant.restaurantOwnerId];
                pool.query(sql, params, async (error: Error | null) => {
                    if (error) throw error;
                    else {
                        res.status(201).send({message: `Restaurant ${restaurant.name} was created!`});
                    }
                })
            } else {
                res.status(400).json({error: 'Missing or incorrect values'});
            }
        } catch (error) {
            res.status(400).json({error: 'Missing values'});
        }
    }

    public static async getAllRestaurants(req: Request, res: Response): Promise<void> {
        try {
            pool.query(
                `SELECT * FROM restaurants`,
                (error: Error | null, results: QueryResult) => {
                    return res.status(200).send({results});
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async getRestaurantByUserId(req: Request, res: Response): Promise<void> {
        const userRequestId = parseInt(req.params.user);
        try {
            pool.query(
                `SELECT * FROM restaurants WHERE restaurant_owner_id =${userRequestId}`,
                (error: Error | null, results: QueryResult<Restaurant[]>) => {
                    return res.status(200).send(results);
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async getRestaurantDashboard(req: Request, res: Response): Promise<Restaurant | any> {
        const requestId = parseInt(req.params.id);
        try {
            pool.query(
                `SELECT * FROM restaurants WHERE restaurant_id = ${requestId}`,
                (error: Error | null, results: QueryResult<Restaurant[]>) => {
                    if (error) throw error;
                    else if (!results) {
                        res.status(404).send({message: "Id doesn't exist or doesn't have the right format"});
                    } else {
                        res.status(200).send(results.rows[0]);
                    }
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async updateRestaurant(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const restaurantRequestId = parseInt(req.params.id);
        const requestUserId = parseInt(req.params.user);
        const bodyRestaurant: Restaurant = {
            restaurantId: body.restaurant_id,
            name: body.name,
            description: body.description,
            address: body.address,
            postCode: body.post_code,
            city: body.city,
            phone: body.phone,
            website: body.website,
            restaurantOwnerId: requestUserId
        };
        try {
            if (bodyRestaurant.name !== '' && bodyRestaurant.description !== '' && bodyRestaurant.address !== '' && bodyRestaurant.postCode !== '' && bodyRestaurant.city !== '' && bodyRestaurant.phone !== '' && Object.keys(body).length >= 6) {
                const sql = `UPDATE restaurants SET name = ?, description = ?, address = ?, post_code = ?, city = ?, phone = ?, website = ?, restaurant_owner_id = ? WHERE restaurant_id = ${restaurantRequestId}`;
                const params = [bodyRestaurant.name, bodyRestaurant.description, bodyRestaurant.address, bodyRestaurant.postCode, bodyRestaurant.city, bodyRestaurant.phone, bodyRestaurant.website, bodyRestaurant.restaurantOwnerId];
                pool.query(sql, params, async (error: Error | null, results: QueryResult) => {
                    if (error) throw error;
                    else if (results.rowCount === 0) {
                        res.status(404).send({message: "Restaurant id doesn't exist or doesn't have the right format"});
                    } else {
                        res.status(201).send({message: `Restaurant ${bodyRestaurant.name} was updated!`});
                    }
                })

            } else {
                res.status(400).json({error: 'Missing or incorrect values'});
            }
        } catch (error) {
            res.status(400).json({error: 'Erreur !'});
        }
    }

    public static async updateAvailability(req: Request, res: Response): Promise<void> {
        const restaurantRequestId = parseInt(req.params.id);
        const isAvailable: boolean = req.body.isAvailable;
        try {
            if (typeof isAvailable !== undefined && isAvailable !== null) {
                const sql = `UPDATE restaurants SET is_available = ? WHERE restaurant_id = ${restaurantRequestId}`;
                const params = [isAvailable]
                pool.query(sql, params,async (error: Error | null, results: QueryResult) => {
                    if (error) throw error;
                    else if (results.rowCount === 0) {
                        res.status(404).send({message: "Restaurant id doesn't exist or doesn't have the right format"});
                    } else {
                        res.status(201).send({message: `Restaurant availability was updated!`});
                    }
                })

            } else {
                res.status(400).json({error: 'Missing or incorrect values'});
            }
        } catch (error) {
            res.status(400).json({error: 'Error'});
        }
    }

    public static async deleteRestaurant(req: Request, res: Response): Promise<void> {
        const requestId = parseInt(req.params.id);
        try {
            pool.query(
                `DELETE FROM restaurants WHERE restaurant_id = ${requestId}`, (error: Error | null, results: QueryResult) => {
                    if (error) throw error;
                    else if (results.rowCount === 0) {
                        res.status(404).send({message: "Restaurant id doesn't exist or doesn't have the right format"});
                    } else {
                        res.status(200).send({message:`Restaurant ${requestId} was deleted!`});
                    }
                })
        } catch (error) {
            res.status(400).json({message: error});
        }
    }
}