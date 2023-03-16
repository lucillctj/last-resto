import {Request, Response} from "express";
import {db} from "../app.js";
import {Users} from "../models/users";
import {QueryError, ResultSetHeader} from "mysql2";

export class ProductsController {
    public static async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            db.query(
                `SELECT * FROM users`,
                (error: Error | null, results: ResultSetHeader) => {
                    return res.status(200).send(results);
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async getUserById(req: Request, res: Response): Promise<void> {
        const requestId = parseInt(req.params.id);
        try {
            db.query(
                `SELECT * FROM users WHERE user_id = ${requestId}`,
                (error: Error | null, results: any) => {

                    if (error) throw error;
                    else if (results.length === 0) {
                        res.status(404).send("Id doesn't exist or doesn't have the right format");
                    } else {
                        res.status(200).send(results);
                    }
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async createUser(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const user: Users = {
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            role: body.role,
            address: body.address,
            postCode: body.post_code,
            city: body.city
        };
        try{
            if (user.role === 'customer') {
                if (user.firstName !== '' && user.lastName !== '' && user.email !== '' && user.phone !== '' && user.password !== '' && user.role && user.address !== '' && user.postCode !== '' && user.city !== '' && Object.keys(body).length === 9) {
                    const sql = `INSERT INTO users (first_name, last_name, email, phone, password, role, address, post_code, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    const params = [user.firstName, user.lastName, user.email, user.phone, user.password, 'customer', user.address, user.postCode, user.city];
                    db.execute(sql, params, async (error: QueryError | null) => {
                        if (error) {
                            await errorValues(req, res, error, user);
                        } else {
                            res.status(201).send(`User with role ${user.role} created!`);
                        }
                    })
                } else {
                    res.status(400).json({error: 'Missing or incorrect values'});
                }
            }else if (user.role === 'restaurant owner' || user.role === 'admin') {
                if (user.firstName !== '' && user.lastName !== '' && user.email !== '' && user.phone !== '' && user.password !== '' && user.role && Object.keys(body).length === 6) {
                    const sql = `INSERT INTO users (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)`;
                    const params = [user.firstName, user.lastName, user.email, user.phone, user.password, user.role];
                    db.execute(sql, params, async (error: QueryError | null) => {
                        if (error) {
                            await errorValues(req, res, error, user);
                        } else {
                            res.status(201).send(`User with role ${user.role} created!`);
                        }
                    })
                }else {
                    res.status(400).json({error: 'Missing or incorrect values'});
                }
            }else {
                res.status(400).json({error: 'Incorrect values'});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({error: 'Missing values'});
        }
    }


    public static async updateUser(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const requestId = parseInt(req.params.id);
        const user: Users = {
            userId: requestId,
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            role: body.role
        };
        try {
            if (user.role === 'customer') {
                if (user.firstName !== '' && user.lastName !== '' && user.email !== '' && user.phone !== '' && user.password !== '' && user.address !== '' && user.postCode !== '' && user.city !== '' && Object.keys(body).length === 9) {
                    const sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ?, address = ?, postCode = ?, city = ? WHERE user_id = ${requestId}`;
                    const params = [user.firstName, user.lastName, user.email, user.phone, user.password, user.address, user.postCode, user.city];
                    db.execute(sql, params, async (error: QueryError | null, results: any) => {
                        if (error) throw error;
                        else if (results.affectedRows === 0) {
                            res.status(404).send("Id doesn't exist or doesn't have the right format");
                        }
                        else {
                            res.status(201).send(`User with role ${user.role} updated!`);
                        }
                    })
                } else {
                    res.status(400).json({error: 'Missing or incorrect values'});
                }
            }else if (user.role === 'restaurant owner' || user.role === 'admin') {
                if (user.firstName !== '' && user.lastName !== '' && user.email !== '' && user.phone !== '' && user.password !== '' && Object.keys(body).length === 6) {
                    const sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ? WHERE user_id = ${requestId}`;
                    const params = [user.firstName, user.lastName, user.email, user.phone, user.password];
                    db.execute(sql, params, async (error: QueryError | null, results: any) => {
                        if (error) throw error;
                        else if (results.affectedRows === 0) {
                            res.status(404).send("Id doesn't exist or doesn't have the right format");
                        }
                        else {
                            res.status(201).send(`User with role ${user.role} updated!`);
                        }
                    })
                }else {
                    res.status(400).json({error: 'Missing or incorrect values'});
                }
            }else {
                res.status(400).json({error: 'Incorrect values'});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({error: 'Missing values'});
        }
    }


    public static async deleteUser(req: Request, res: Response): Promise<void> {
        const requestId = parseInt(req.params.id);
        try {
            db.execute(
                `DELETE FROM users WHERE user_id = ${requestId}`, (error: Error | null, results: ResultSetHeader) => {
                    if (error) throw error;

                    else if (results.affectedRows === 0) {
                        res.status(404).send("Id doesn't exist or doesn't have the right format");
                    } else {
                        res.status(200).send('User deleted!');
                    }
                })
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error"});
        }
    }
}

function errorValues(req: Request, res: Response, error: any, newUser: Users): any {
    if (error.sqlMessage === `Duplicate entry '${newUser.email}' for key 'users.email'`) {
        res.status(400);
        res.send("Email already exist in database!");
    } else if (error.sqlMessage === `Duplicate entry '${newUser.phone}' for key 'users.phone'`) {
        res.status(400);
        res.send("Phone already exist in database!");
    } else {
        res.status(400);
        res.send("Error");
    }
    res.end();
}