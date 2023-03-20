import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Authorization token not provided' });
    }
    else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (error: any, user) => {
            if (error){
                (req as any).user = undefined;
                return res.status(401).json({ error: 'Authorization token not provided' });
            }
            else {
                (req as any).user = user;
                next();
            }
        });
    }
};

export function generateAccessToken(userId: any) {
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '1800s'});
}

export function generateRefreshToken(userId: any) {
    return jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: '1y'});
}