import {Request, Response, NextFunction} from "express";
import {db} from "../app.js";
import {Users} from "../models/users";
import {QueryError, ResultSetHeader} from "mysql2";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from "../middleware/auth"

export class UsersController {
    public static async createUserAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const body = req.body;
        const bodyUser: Users = {
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
        const hashPassword = await bcrypt.hash(bodyUser.password, 10);

        try{
            if (bodyUser.role === 'customer') {
                if (bodyUser.firstName !== '' && bodyUser.lastName !== '' && bodyUser.email !== '' && bodyUser.phone !== '' && bodyUser.password !== '' && bodyUser.role && bodyUser.address !== '' && bodyUser.postCode !== '' && bodyUser.city !== '' && Object.keys(body).length === 9) {
                    const sql = `INSERT INTO users (first_name, last_name, email, phone, password, role, address, post_code, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    const params = [bodyUser.firstName, bodyUser.lastName, bodyUser.email, bodyUser.phone, hashPassword, 'customer', bodyUser.address, bodyUser.postCode, bodyUser.city];
                    db.execute(sql, params, async (error: QueryError | null, results: any) => {
                        if (error) {
                            await errorValues(req, res, error, bodyUser);
                        } else {
                            const accessToken = generateAccessToken(results[0].user_id);
                            res.status(201).send({
                                message: `Utilisateur avec le rôle ${bodyUser.role} a été créé !`,
                                accessToken
                            });
                        }
                    })
                } else {
                    res.status(400).json({error: 'Certains champs sont manquants ou incorrects.'});
                }
            }else if (bodyUser.role === 'restaurant owner' || bodyUser.role === 'admin') {
                if (bodyUser.firstName !== '' && bodyUser.lastName !== '' && bodyUser.email !== '' && bodyUser.phone !== '' && bodyUser.password !== '' && bodyUser.role && Object.keys(body).length === 6) {
                    const sql = `INSERT INTO users (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)`;
                    const params = [bodyUser.firstName, bodyUser.lastName, bodyUser.email, bodyUser.phone, hashPassword, bodyUser.role];
                    db.execute(sql, params, async (error: QueryError | null, results: any) => {
                        if (error) {
                            await errorValues(req, res, error, bodyUser);
                        } else {
                            const accessToken = generateAccessToken(results[0].user_id);
                            res.status(201).send({
                                message: `Utilisateur avec le rôle ${bodyUser.role} a été créé !`,
                                accessToken
                            });
                        }
                    })
                }else {
                    res.status(400).json({error: 'Certains champs sont manquants ou incorrects.'});
                }
            }else {
                res.status(400).json({error: 'Erreur !'});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({error: 'Erreur !'});
        }
    }

    public static async loginToUserAccount(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const bodyUser: Users = {
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
        if (bodyUser.email !== '' && bodyUser.password !== '' && Object.keys(body).length === 2) {
            db.query('SELECT * FROM users WHERE email = ?', [bodyUser.email], async (error: QueryError | null, results: any) => {
                if (error) throw error;
                else if (results.length === 0) {
                    return res.status(401).send({message: 'Aucun utilisateur trouvé !', accessToken: null});
                } else {
                    const compareHashPassword = await bcrypt.compare(bodyUser.password, results[0].password);
                    if (!compareHashPassword) {
                        return res.status(401).json({message: "Mot de passe invalide"});
                    }
                    const accessToken = generateAccessToken(results[0].user_id);
                    const refreshToken = generateRefreshToken(results[0].user_id);

                    return res.status(200).send({
                        message: "Authentification réussie",
                        accessToken,
                        refreshToken
                    });
                }
            });
        }
        else {
            res.status(400).json({error: 'Certains champs sont manquants.'});
        }
    }

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
                        res.status(404).send('L\'identifiant n\'existe pas ou n\'a pas le bon format.');
                    } else {
                        res.status(200).send(results);
                    }
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    // public static async createUser(req: Request, res: Response): Promise<void> {
    //     const body = req.body;
    //     const bodyUser: Users = {
    //         firstName: body.first_name,
    //         lastName: body.last_name,
    //         email: body.email,
    //         phone: body.phone,
    //         password: body.password,
    //         role: body.role,
    //         address: body.address,
    //         postCode: body.post_code,
    //         city: body.city
    //     };
    //     try{
    //         if (bodyUser.role === 'customer') {
    //             if (bodyUser.firstName !== '' && bodyUser.lastName !== '' && bodyUser.email !== '' && bodyUser.phone !== '' && bodyUser.password !== '' && bodyUser.role && bodyUser.address !== '' && bodyUser.postCode !== '' && bodyUser.city !== '' && Object.keys(body).length === 9) {
    //                 const sql = `INSERT INTO users (first_name, last_name, email, phone, password, role, address, post_code, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    //                 const params = [bodyUser.firstName, bodyUser.lastName, bodyUser.email, bodyUser.phone, bodyUser.password, 'customer', bodyUser.address, bodyUser.postCode, bodyUser.city];
    //                 db.execute(sql, params, async (error: QueryError | null) => {
    //                     if (error) {
    //                         await errorValues(req, res, error, bodyUser);
    //                     } else {
    //                         res.status(201).send(`Utilisateur avec le rôle ${bodyUser.role} a été créé !`);
    //                     }
    //                 })
    //             } else {
    //                 res.status(400).json({error: 'Certains champs sont manquants ou incorrects.'});
    //             }
    //         }else if (bodyUser.role === 'restaurant owner' || bodyUser.role === 'admin') {
    //             if (bodyUser.firstName !== '' && bodyUser.lastName !== '' && bodyUser.email !== '' && bodyUser.phone !== '' && bodyUser.password !== '' && bodyUser.role && Object.keys(body).length === 6) {
    //                 const sql = `INSERT INTO users (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)`;
    //                 const params = [bodyUser.firstName, bodyUser.lastName, bodyUser.email, bodyUser.phone, bodyUser.password, bodyUser.role];
    //                 db.execute(sql, params, async (error: QueryError | null) => {
    //                     if (error) {
    //                         await errorValues(req, res, error, bodyUser);
    //                     } else {
    //                         res.status(201).send(`Utilisateur avec le rôle ${bodyUser.role} a été créé !`);
    //                     }
    //                 })
    //             }else {
    //                 res.status(400).json({error: 'Certains champs sont manquants ou incorrects.'});
    //             }
    //         }else {
    //             res.status(400).json({error: 'Erreur !'});
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         res.status(400).json({error: 'Erreur !'});
    //     }
    // }


    public static async updateUser(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const requestId = parseInt(req.params.id);
        const bodyUser: Users = {
            userId: requestId,
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            role: body.role
        };
        try {
            if (bodyUser.role === 'customer') {
                if (bodyUser.firstName !== '' && bodyUser.lastName !== '' && bodyUser.email !== '' && bodyUser.phone !== '' && bodyUser.password !== '' && bodyUser.address !== '' && bodyUser.postCode !== '' && bodyUser.city !== '' && Object.keys(body).length === 9) {
                    const sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ?, address = ?, postCode = ?, city = ? WHERE user_id = ${requestId}`;
                    const params = [bodyUser.firstName, bodyUser.lastName, bodyUser.email, bodyUser.phone, bodyUser.password, bodyUser.address, bodyUser.postCode, bodyUser.city];
                    db.execute(sql, params, async (error: QueryError | null, results: any) => {
                        if (error) throw error;
                        else if (results.affectedRows === 0) {
                            res.status(404).send('L\'identifiant n\'existe pas ou n\'a pas le bon format.');
                        }
                        else {
                            res.status(201).send(`Utilisateur avec le rôle ${bodyUser.role} a été mis à jour !`);
                        }
                    })
                } else {
                    res.status(400).json({error: 'Certains champs sont manquants ou incorrects.'});
                }
            }else if (bodyUser.role === 'restaurant owner' || bodyUser.role === 'admin') {
                if (bodyUser.firstName !== '' && bodyUser.lastName !== '' && bodyUser.email !== '' && bodyUser.phone !== '' && bodyUser.password !== '' && Object.keys(body).length === 6) {
                    const sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ? WHERE user_id = ${requestId}`;
                    const params = [bodyUser.firstName, bodyUser.lastName, bodyUser.email, bodyUser.phone, bodyUser.password];
                    db.execute(sql, params, async (error: QueryError | null, results: any) => {
                        if (error) throw error;
                        else if (results.affectedRows === 0) {
                            res.status(404).send('L\'identifiant n\'existe pas ou n\'a pas le bon format.');
                        }
                        else {
                            res.status(201).send(`Utilisateur avec le rôle ${bodyUser.role} a été mis à jour !`);
                        }
                    })
                }else {
                    res.status(400).json({error: 'Certains champs sont manquants ou incorrects.'});
                }
            }else {
                res.status(400).json({error: 'Erreur !'});
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({error: 'Erreur !'});
        }
    }


    public static async deleteUser(req: Request, res: Response): Promise<void> {
        const requestId = parseInt(req.params.id);
        try {
            db.execute(
                `DELETE FROM users WHERE user_id = ${requestId}`, (error: Error | null, results: ResultSetHeader) => {
                    if (error) throw error;

                    else if (results.affectedRows === 0) {
                        res.status(404).send('L\'identifiant n\'existe pas ou n\'a pas le bon format.');
                    } else {
                        res.status(200).send('L\'utilisateur a été supprimé !');
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
        res.send("Cet email existe déjà !");
    } else if (error.sqlMessage === `Duplicate entry '${newUser.phone}' for key 'users.phone'`) {
        res.status(400);
        res.send("Ce numéro de téléphone existe déjà !");
    } else {
        res.status(400);
        res.send("Erreur !");
    }
    res.end();
}