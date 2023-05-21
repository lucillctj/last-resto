import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

export const setTokenCookie = (res: Response, token: string) => {
    res.cookie('token', token, {
        maxAge: 7200000,
        secure: true,
        httpOnly: true,
        sameSite: 'lax'
    });

};

export function generateAccessToken(userId: any) {
    return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET!, {expiresIn: '1800s'});
}

export function generateRefreshToken(userId: any) {
    return jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET!, {expiresIn: '60d'});
}

// export const verifyAuthTokenHeader = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ error: 'Invalid authentication token format' });
//     }
//     else {
//         const token = authHeader.split(' ')[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (error: any, user) => {
//             if (error){
//                 (req as any).user = undefined;
//                 return res.status(401).json({ error: 'Authorization token not provided' });
//             }
//             else {
//                 (req as any).user = user;
//                 next();
//             }
//         });
//     }
// };