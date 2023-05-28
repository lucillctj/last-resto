import {Request, Response, NextFunction} from "express";
import {db} from "../app";
import {RestaurantOwner} from "../models/restaurantOwner";
import {QueryError, ResultSetHeader} from "mysql2";
import bcrypt from 'bcryptjs';
import {generateAccessToken, generateRefreshToken, setTokenCookie} from "../middleware/auth"

export class RestaurantOwnerController {
    public static async createRestaurantOwnerAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
        const body = req.body;
        const bodyRestaurantOwner: RestaurantOwner = {
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            role: 'restaurant owner',
        };
        const hashPassword = await bcrypt.hash(bodyRestaurantOwner.password, 10);

        try{
            if (bodyRestaurantOwner.firstName !== '' && bodyRestaurantOwner.lastName !== '' && bodyRestaurantOwner.email !== '' && bodyRestaurantOwner.phone !== '' && bodyRestaurantOwner.password !== '' && Object.keys(body).length === 5) {
                const sql = `INSERT INTO users (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)`;
                const params = [bodyRestaurantOwner.firstName, bodyRestaurantOwner.lastName, bodyRestaurantOwner.email, bodyRestaurantOwner.phone, hashPassword, 'restaurant owner'];
                db.execute(sql, params, async (error: QueryError | null, results: any) => {
                    if (error) {
                        await errorValues(req, res, error, bodyRestaurantOwner);
                    } else {
                        const accessToken = generateAccessToken(results.insertId);
                        setTokenCookie(res, accessToken);
                        res.status(201).send({
                            message: `Utilisateur avec le rôle 'restaurant owner' a été créé !`,
                            userId: results.insertId,
                            accessToken
                        });
                    }
                })
            }else {
                res.status(400).json({error: 'Certains champs sont manquants ou incorrects.'});
            }

        } catch (error) {
            res.status(400).json({error: 'Erreur !'});
        }
    }

    public static async loginToRestaurantOwnerAccount(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const bodyRestaurantOwner: RestaurantOwner = {
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            role: 'restaurant owner',
        };
        if (bodyRestaurantOwner.email !== '' && bodyRestaurantOwner.password !== '' && Object.keys(body).length === 2) {
            db.query(`SELECT * FROM users WHERE role = 'restaurant owner' AND email = ?`, [bodyRestaurantOwner.email], async (error: QueryError | null, results: any) => {
                if (error) throw error;
                else if (results.length === 0) {
                    return res.status(401).send({message: 'Aucun utilisateur trouvé !', accessToken: null});
                } else {
                    const compareHashPassword = await bcrypt.compare(bodyRestaurantOwner.password, results[0].password);
                    if (!compareHashPassword) {
                        return res.status(401).json({message: "Mot de passe invalide"});
                    }
                    const accessToken = generateAccessToken(results[0].userId);
                    setTokenCookie(res, accessToken);
                    const refreshToken = generateRefreshToken(results[0].userId);

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

    public static async getAllRestaurantOwners(req: Request, res: Response): Promise<void> {
        try {
            db.query(
                `SELECT * FROM users WHERE role = 'restaurant owner'`,
                (error: Error | null, results: ResultSetHeader) => {
                    return res.status(200).send(results);
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async getRestaurantOwnerDashboard(req: Request, res: Response): Promise<void> {
        const requestId = parseInt(req.params.id);
        try {
            db.query(
                `SELECT * FROM users WHERE role = 'restaurant owner' AND user_id = ${requestId}`,
                (error: Error | null, results: RestaurantOwner[]) => {

                    if (error) throw error;
                    else if (results.length === 0) {
                        res.status(404).send('L\'identifiant n\'existe pas ou n\'a pas le bon format.');
                    } else {
                        console.log(results[0])
                        res.status(200).send(results[0]);
                    }
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async updateRestaurantOwner(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const requestId = parseInt(req.params.id);
        const bodyRestaurantOwner: RestaurantOwner = {
            userId: requestId,
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            role: 'restaurant owner'
        };
        try {
            if (bodyRestaurantOwner.firstName !== '' && bodyRestaurantOwner.lastName !== '' && bodyRestaurantOwner.email !== '' && bodyRestaurantOwner.phone !== '' && bodyRestaurantOwner.password !== '' && Object.keys(body).length === 5) {
                const sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ? WHERE role = 'restaurant owner' AND user_id = ${requestId}`;
                const params = [bodyRestaurantOwner.firstName, bodyRestaurantOwner.lastName, bodyRestaurantOwner.email, bodyRestaurantOwner.phone, bodyRestaurantOwner.password];
                db.execute(sql, params, async (error: QueryError | null, results: any) => {
                    if (error) throw error;
                    else if (results.affectedRows === 0) {
                        res.status(404).send('L\'identifiant n\'existe pas ou n\'a pas le bon format.');
                    }
                    else {
                        res.status(201).send(`Utilisateur avec le rôle 'restaurant owner' a été mis à jour !`);
                    }
                })
            }else {
                res.status(400).json({error: 'Certains champs sont manquants ou incorrects.'});
            }
        } catch (error) {
            res.status(400).json({error: 'Erreur !'});
        }
    }


    public static async deleteRestaurantOwner(req: Request, res: Response): Promise<void> {
        const requestId = parseInt(req.params.id);
        try {
            db.execute(
                `DELETE FROM users WHERE role = 'restaurant owner' AND user_id = ${requestId}`, (error: Error | null, results: ResultSetHeader) => {
                    if (error) throw error;

                    else if (results.affectedRows === 0) {
                        res.status(404).send('L\'identifiant n\'existe pas ou n\'a pas le bon format.');
                    } else {
                        res.status(200).send('L\'utilisateur a été supprimé !');
                    }
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }
}

function errorValues(req: Request, res: Response, error: any, newRestaurantOwner: RestaurantOwner): any {
    if (error.sqlMessage === `Duplicate entry '${newRestaurantOwner.email}' for key 'users.email'`) {
        res.status(400);
        res.send("Cet email existe déjà !");
    } else if (error.sqlMessage === `Duplicate entry '${newRestaurantOwner.phone}' for key 'users.phone'`) {
        res.status(400);
        res.send("Ce numéro de téléphone existe déjà !");
    } else {
        res.status(400);
        res.send("Erreur !");
    }
    res.end();
}