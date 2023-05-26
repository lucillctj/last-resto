import {Request, Response} from "express";
import {db} from "../app";
import {QueryError, ResultSetHeader} from "mysql2";
import {Restaurant} from "../models/restaurant";

export class RestaurantController {
    public static async getAllRestaurants(req: Request, res: Response): Promise<void> {
        try {
            db.query(
                `SELECT * FROM restaurants`,
                (error: Error | null, results: ResultSetHeader) => {
                    return res.status(200).send({results});
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async getRestaurantByUserId(req: Request, res: Response): Promise<void> {
        const userRequestId = parseInt(req.params.id);
        try {
            db.query(
                `SELECT * FROM restaurants WHERE user_id =${userRequestId}`,
                (error: Error | null, results: Restaurant[]) => {
                    return res.status(200).send(results);
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    // public static async getRestaurantByProductId(req: Request, res: Response): Promise<any> {
    //     const productRequestId = parseInt(req.params.id);
    //     try {
    //         db.query(
    //             `SELECT * FROM restaurants WHERE product_id = ${productRequestId}`,
    //             (error: Error | null, results: number) => {
    //                 console.log('results', results)
    //                 return res.status(200).send(results);
    //             })
    //     } catch (error) {
    //         res.status(500).json({message: "Internal server error"});
    //     }
    // }

    public static async getRestaurantDashboard(req: Request, res: Response): Promise<Restaurant | any> {
        const requestId = parseInt(req.params.id);
        try {
            db.query(
                `SELECT * FROM restaurants WHERE restaurant_id = ${requestId}`,
                (error: Error | null, results: Restaurant[]) => {
                    if (error) throw error;
                    else if (!results) {
                        res.status(404).send({message: "Id doesn't exist or doesn't have the right format"});
                    } else {
                        res.status(200).send(results[0]);
                    }
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async createRestaurant(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const restaurant: Restaurant = {
            name: body.name,
            description: body.description,
            address: body.address,
            postCode: body.post_code,
            city: body.city,
            phone: body.phone,
            website: body.website || null,
            isReserved: body.is_reserved,
            userId: body.user_id
        };
        try {
            if (restaurant.name !== '' && restaurant.description !== '' && restaurant.address !== '' && restaurant.postCode !== '' && restaurant.city !== '' && restaurant.phone !== '' && restaurant.userId! >=1 && (Object.keys(body).length === 7 || 8)
            ) {
                const sql = `INSERT INTO restaurants (name, description, address, post_code, city, phone, website, is_reserved, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const params = [restaurant.name, restaurant.description, restaurant.address, restaurant.postCode, restaurant.city, restaurant.phone, restaurant.website, false, restaurant.userId];
                db.execute(sql, params, async (error: QueryError | null) => {
                    if (error) throw error;
                    else {
                        // const sqlUpdate = `UPDATE users SET restaurant_id = ? WHERE role = 'restaurant owner' AND user_id = ?`;
                        // await db.execute(sqlUpdate, [restaurantResults.insertId, restaurant.userId], async () =>
                        res.status(201).send({message: `Restaurant ${restaurant.name} was created!`});
                    }
                })
            } else {
                res.status(400).json({error: 'Missing or incorrect values'});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({error: 'Missing values'});
        }
    }


    public static async updateRestaurant(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const requestId = parseInt(req.params.id);
        const restaurant: Restaurant = {
            restaurantId: body.restaurant_id,
            name: body.name,
            description: body.description,
            address: body.address,
            postCode: body.post_code,
            city: body.city,
            phone: body.phone,
            website: body.website,
            isReserved: body.is_reserved,
            userId: body.user_id
        };
        try {
            if (restaurant.name !== '' && restaurant.description !== '' && restaurant.address !== '' && restaurant.postCode !== '' && restaurant.city !== '' && restaurant.phone !== '' && restaurant.address !== '' && Object.keys(body).length === 8 || 9) {
                const sql = `UPDATE restaurants SET name = ?, description = ?, address = ?, post_code = ?, city = ?, phone = ?, website = ?, is_reserved = ?, user_id = ? WHERE restaurant_id = ${requestId}`;
                const params = [restaurant.name, restaurant.description, restaurant.address, restaurant.postCode, restaurant.city, restaurant.phone, restaurant.website, restaurant.isReserved, restaurant.userId];
                db.execute(sql, params, async (error: QueryError | null, results: any) => {
                    if (error) throw error;
                    else if (results.affectedRows === 0) {
                        res.status(404).send({message: "Restaurant id doesn't exist or doesn't have the right format"});
                    } else {
                        res.status(201).send({message: `Restaurant ${restaurant.name} was updated!`});
                    }
                })

            } else {
                res.status(400).json({error: 'Missing or incorrect values'});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({error: 'Missing values'});
        }
    }


    public static async deleteRestaurant(req: Request, res: Response): Promise<void> {
        const requestId = parseInt(req.params.id);
        try {
            db.execute(
                `DELETE FROM restaurants WHERE restaurant_id = ${requestId}`, (error: Error | null, results: ResultSetHeader) => {
                    if (error) throw error;
                    else if (results.affectedRows === 0) {
                        res.status(404).send({message: "Restaurant id doesn't exist or doesn't have the right format"});
                    } else {
                        res.status(200).send({message:`Restaurant ${requestId} was deleted!`});
                    }
                })
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"});
        }
    }
}


// // methode delete avec sequelize :
// export static async deleteRestaurant(req: Request, res: Response): Promise<void> {
//     const requestId = parseInt(req.params.id);
//     try {
//         const restaurant = await Restaurant.findOne({ where: { restaurant_id: requestId } });
//         if (!restaurant) {
//     res.status(404).send("Restaurant id doesn't exist or doesn't have the right format");
//     return;
// }
// const restaurantName = restaurant.name;
// await restaurant.destroy();
// res.status(200).send(`Restaurant ${restaurantName} was deleted!`);
// } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
// }
// }