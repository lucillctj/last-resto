import {Request, Response, NextFunction} from "express";
import {db} from "../app";
import {Customer} from "../models/customer";
import {QueryError, ResultSetHeader} from "mysql2";
import bcrypt from 'bcryptjs';
import {generateAccessToken, generateRefreshToken, setTokenCookie} from "../middleware/auth"

export class CustomerController {
    public static async createCustomerAccount(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const bodyCustomer: Customer = {
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            address: body.address,
            postCode: body.post_code,
            city: body.city,
            role: 'customer'
        };
        const hashPassword = await bcrypt.hash(bodyCustomer.password, 10);

        try{
            if (bodyCustomer.firstName !== '' && bodyCustomer.lastName !== '' && bodyCustomer.email !== '' && bodyCustomer.phone !== '' && bodyCustomer.password !== '' && bodyCustomer.address !== '' && bodyCustomer.postCode !== '' && bodyCustomer.city !== '' && Object.keys(body).length === 8) {
                const sql = `INSERT INTO users (first_name, last_name, email, phone, password, role, address, post_code, city) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                const params = [bodyCustomer.firstName, bodyCustomer.lastName, bodyCustomer.email, bodyCustomer.phone, hashPassword, 'customer', bodyCustomer.address, bodyCustomer.postCode, bodyCustomer.city];
                db.execute(sql, params, async (error: QueryError | null, results: any) => {
                    if (error) {
                        await errorValues(req, res, error, bodyCustomer);
                    } else {
                        const accessToken = generateAccessToken(results.insertId);
                        setTokenCookie(res, accessToken);
                        res.status(201).send({
                            message: `Utilisateur avec le rôle 'customer' a été créé !`,
                            accessToken
                        });
                    }
                })
            } else {
                res.status(400).json({error: 'Certains champs sont manquants ou incorrects.'});
            }
        } catch (error) {
            res.status(400).json({error: 'Erreur !'});
        }
    }

    public static async loginToCustomerAccount(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const bodyCustomer: Customer = {
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            address: body.address,
            postCode: body.post_code,
            city: body.city,
            role: 'customer'
        };
        if (bodyCustomer.email !== '' && bodyCustomer.password !== '' && Object.keys(body).length === 2) {
            db.query(`SELECT * FROM users WHERE role = 'customer' AND email = ?`, [bodyCustomer.email], async (error: QueryError | null, results: any) => {
                if (error) throw error;
                else if (results.length === 0) {
                    return res.status(401).send({message: 'Aucun utilisateur trouvé !', accessToken: null});
                } else {
                    const compareHashPassword = await bcrypt.compare(bodyCustomer.password, results[0].password);
                    if (!compareHashPassword) {
                        return res.status(401).json({message: "Mot de passe invalide"});
                    }
                    const accessToken = generateAccessToken(results[0].userId);
                    setTokenCookie(res, accessToken);
                    const refreshToken = generateRefreshToken(results[0].userId);

                    console.log('-----> result userId: ', results[0].userId);

                    return res.status(200).send({
                        message: "Authentification réussie",
                        accessToken,
                        refreshToken,
                        userId: results[0].userId
                    });
                }
            });
        }
        else {
            res.status(400).json({error: 'Certains champs sont manquants.'});
        }
    }

    public static async getAllCustomers(req: Request, res: Response): Promise<void> {
        try {
            db.query(
                `SELECT * FROM users WHERE role = 'customer'`,
                (error: Error | null, results: ResultSetHeader) => {
                    return res.status(200).send(results);
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async getCustomerDashboard(req: Request, res: Response): Promise<void> {
        const userId = parseInt(req.params.id);
        try {
            db.query(
                `SELECT * FROM users WHERE role = 'customer' AND user_id = ${userId}`,
                (error: Error | null, results: any) => {

                    if (error) throw error;
                    else if (results.length === 0) {
                        res.status(404).send('L\'identifiant n\'existe pas ou n\'a pas le bon format.');
                    } else {
                        res.status(200).send({results});
                    }
                })
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
        }
    }

    public static async updateCustomer(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const requestId = parseInt(req.params.id);
        const bodyCustomer: Customer = {
            userId: requestId,
            firstName: body.first_name,
            lastName: body.last_name,
            email: body.email,
            phone: body.phone,
            password: body.password,
            address: body.address,
            postCode: body.post_code,
            city: body.city,
            role: 'customer'
        };
        try {
            if (bodyCustomer.firstName !== '' && bodyCustomer.lastName !== '' && bodyCustomer.email !== '' && bodyCustomer.phone !== '' && bodyCustomer.password !== '' && bodyCustomer.address !== '' && bodyCustomer.postCode !== '' && bodyCustomer.city !== '' && Object.keys(body).length === 8) {
                const sql = `UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, password = ?, address = ?, post_code = ?, city = ? WHERE role = 'customer' AND user_id = ${requestId}`;
                const params = [bodyCustomer.firstName, bodyCustomer.lastName, bodyCustomer.email, bodyCustomer.phone, bodyCustomer.password, bodyCustomer.address, bodyCustomer.postCode, bodyCustomer.city];
                db.execute(sql, params, async (error: QueryError | null, results: any) => {
                    if (error) throw error;
                    else if (results.affectedRows === 0) {
                        res.status(404).send('L\'identifiant n\'existe pas ou n\'a pas le bon format.');
                    }
                    else {
                        res.status(201).send(`Utilisateur avec le rôle customer a été mis à jour !`);
                    }
                })
            } else {
                res.status(400).json({error: 'Certains champs sont manquants ou incorrects.'});
            }
        } catch (error) {
            res.status(400).json({error: 'Erreur !'});
        }
    }


    public static async deleteCustomer(req: Request, res: Response): Promise<void> {
        const requestId = parseInt(req.params.id);
        try {
            db.execute(
                `DELETE FROM users WHERE role = 'customer' AND user_id = ${requestId}`, (error: Error | null, results: ResultSetHeader) => {
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

//pour delete cookie (logout...)
//     app.get('/deletecookie', (req, res) => {
//     //show the saved cookies
//     res.clearCookie()
//     res.send('Cookie has been deleted successfully');
// });

function errorValues(req: Request, res: Response, error: any, newCustomer: Customer): any {
    if (error.sqlMessage === `Duplicate entry '${newCustomer.email}' for key 'users.email'`) {
        res.status(400);
        res.send("Cet email existe déjà !");
    } else if (error.sqlMessage === `Duplicate entry '${newCustomer.phone}' for key 'users.phone'`) {
        res.status(400);
        res.send("Ce numéro de téléphone existe déjà !");
    } else {
        res.status(400);
        res.send("Erreur !");
    }
    res.end();
}