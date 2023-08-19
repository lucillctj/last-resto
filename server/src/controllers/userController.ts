import {Request, Response} from "express";
import {pool} from "../app";
import bcrypt from "bcryptjs";
import {clearTokenCookie, generateAccessToken, setTokenCookie} from "../middleware/auth";
import {QueryResult} from "pg";

export class UserController {

    public static async loginToUserAccount(req: Request, res: Response): Promise<void> {
        const body = req.body;
        const bodyUser = {
            email: body.email,
            password: body.password
        };
        if (bodyUser.email !== '' && bodyUser.password !== '') {
            pool.query(`SELECT * FROM users WHERE email = ?`, [bodyUser.email], async (error: Error | null, results: QueryResult) => {
                if (error) throw error;
                else if (results.rowCount === 0) {
                    return res.status(401).send({message: 'Aucun utilisateur trouvé !'});
                } else {
                    const compareHashPassword = await bcrypt.compare(bodyUser.password, results.rows[0].password);
                    if (!compareHashPassword) {
                        return res.status(401).json({message: "Mot de passe invalide"});
                    }
                    const accessToken = generateAccessToken(results.rows[0].user_id);
                    setTokenCookie(res, accessToken);

                    return res.status(200).send({
                        message: "Authentification réussie",
                        userId: results.rows[0].user_id,
                        userRole: results.rows[0].role
                    });
                }
            });
        } else {
            res.status(400).json({error: 'Certains champs sont manquants.'});
        }
    }

    public static async logoutToAccount(req: Request, res: Response): Promise<void> {
        try {
            clearTokenCookie(res);
            res.status(200).json({message: "Utilisateur déconnecté"});
        } catch (error) {
            res.status(400).json({message: "Une erreur s'est produite lors de la déconnexion"});
        }
    }

    public static async deleteUser(req: Request, res: Response): Promise<void> {
        const requestId = parseInt(req.params.user);
        try {
            pool.query(
                `DELETE FROM users WHERE user_id = ${requestId}`, (error: Error | null, results: QueryResult) => {
                    if (error) throw error;

                    else if (results.rowCount === 0) {
                        res.status(404).send({message: 'L\'identifiant n\'existe pas ou n\'a pas le bon format.'});
                    } else {
                        clearTokenCookie(res);
                        res.status(200).send({message: 'L\'utilisateur a été supprimé !'});
                    }
                })
        } catch (error) {
            res.status(400).json({message: "Internal server error"});
        }
    }
}
