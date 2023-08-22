import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import mysql, {QueryError} from 'mysql2';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';
import {customerRoutes} from "./routes/customerRoutes";
import {restaurantOwnerRoutes} from "./routes/restaurantOwnerRoutes";
import {restaurantRoutes} from "./routes/restaurantRoutes";
import {productRoutes} from "./routes/productRoutes";
import {adminRoutes} from "./routes/adminRoutes";
import {usersRoutes} from "./routes/usersRoutes";
import path from "path";

dotenv.config();

const app: Express = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Durée de la "fenêtre" de tentative, ici, 15 minutes
    max: 100, // Nombre maximun de tentatives avant le verrouillage
    standardHeaders: true, // Communique sur le nombre maximun de requêtes restantes pendant une période données dans les en-têtes
    legacyHeaders: false, // Indique au middleware de ne pas utiliser les anciennes en-têtes
});

app.use(express.static(path.join(__dirname, 'view/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'dist', 'index.html'));
});

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

const { WAFJS } = require('wafjs')
const baseConfig = {
    allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
    contentTypes: ['application/json', 'multipart/form-data']
}
let _wafjs = new WAFJS(baseConfig);

app.use(async (req, res, next) => {
    if(_wafjs.reqCheck(req.method, req.headers['content-type']))
        res.status(403).send();
    next();
});

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/api/v1/customers', apiLimiter, customerRoutes());
app.use('/api/v1/restaurant-owners', apiLimiter, restaurantOwnerRoutes());
app.use('/api/v1/admins', apiLimiter, adminRoutes());
app.use('/api/v1/users', apiLimiter, usersRoutes());
app.use('/api/v1/restaurants', apiLimiter, restaurantRoutes());
app.use('/api/v1/products', apiLimiter, productRoutes());
console.log(process.env.DB_URL)
export const db = mysql.createConnection(process.env.DB_URL ?? '');
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

db.connect((error: QueryError | null) => {
    if (error) {
        console.error('Error connecting to MySQL database: ', error);
        return;
    }
    console.log('Connected to MySQL database :)');
});










