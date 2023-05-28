import {Request, Response} from "express";
import {Customer} from "../models/customer";
import {db} from "../app";
import {QueryError} from "mysql2/index";
import bcrypt from "bcryptjs";
import {generateAccessToken, generateRefreshToken, setTokenCookie} from "../middleware/auth";
import {ResultSetHeader} from "mysql2";

export class UserController {

    public static async loginToUserAccount(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const bodyUser = {
            email: body.email,
            password: body.password
        };
        if (bodyUser.email !== '' && bodyUser.password !== '' && Object.keys(body).length === 2) {
            db.query(`SELECT * FROM users WHERE email = ?`, [bodyUser.email], async (error: QueryError | null, results: any) => {
                if (error) throw error;
                else if (results.length === 0) {
                    return res.status(401).send({message: 'Aucun utilisateur trouvé !'});
                } else {
                    const compareHashPassword = await bcrypt.compare(bodyUser.password, results[0].password);
                    if (!compareHashPassword) {
                        return res.status(401).json({message: "Mot de passe invalide"});
                    }
                    const accessToken = generateAccessToken(results[0].user_id);
                    setTokenCookie(res, accessToken);
                    const refreshToken = generateRefreshToken(results[0].user_id);

                    return res.status(200).send({
                        message: "Authentification réussie",
                        userId: results[0].user_id,
                        userRole: results[0].role,
                        accessToken,
                        refreshToken,
                    });
                }
            });
        }
        else {
            res.status(400).json({error: 'Certains champs sont manquants.'});
        }
    }

    public static async logoutToAccount(req: Request, res: Response): Promise<void> {
        try {
            res.clearCookie('token');
            res.status(200).json({message: "Utilisateur déconnecté"});
        } catch (error) {
            res.status(500).json({message: "Internal server error"});
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
            res.status(500).json({message: "Internal server error"});
        }
    }
}