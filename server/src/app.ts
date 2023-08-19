import express, {Express, NextFunction, Response} from 'express';
import cookieParser from 'cookie-parser';
import {Pool} from "pg";
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import dotenv from 'dotenv';
import {customerRoutes} from "./routes/customerRoutes";
import {restaurantOwnerRoutes} from "./routes/restaurantOwnerRoutes";
import {restaurantRoutes} from "./routes/restaurantRoutes";
import {productRoutes} from "./routes/productRoutes";
import {adminRoutes} from "./routes/adminRoutes";
import {usersRoutes} from "./routes/usersRoutes";
import proxyAddr from "proxy-addr";
import {IncomingMessage} from "http";
import helmet from 'helmet';

dotenv.config();

const app: Express = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};
app.use(cors(corsOptions));

app.set('trust proxy', 1);
app.use((req: IncomingMessage, res: Response, next: NextFunction) => {
    const trust: string | string[] = ['loopback', 'linklocal', 'uniquelocal']; // Adresses de confiance pour proxy-addr
    proxyAddr(req, trust); // Met à jour l'adresse IP dans la requête
    next();
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // Durée de la "fenêtre" de tentative, ici, 15 minutes
    max: 100, // Nombre maximun de tentatives avant le verrouillage
    standardHeaders: true, // Communique sur le nombre maximun de requêtes restantes pendant une période données dans les en-têtes
    legacyHeaders: false, // Indique au middleware de ne pas utiliser les anciennes en-têtes
});

// app.use(express.static(path.join(__dirname, 'view/dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'view', 'dist', 'index.html'));
// });

// app.use((req, res, next) => {
//     // res.setHeader('Content-Type', 'text/html');
//     res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
//     res.setHeader('X-Content-Type-Options', 'nosniff');
//     res.setHeader('X-XSS-Protection', '1; mode=block');
//     next();
// });

app.use(helmet());


// const { WAFJS } = require('wafjs')
// const baseConfig = {
//     allowedMethods: ['GET', 'POST', 'PUT', 'DELETE'],
//     contentTypes: ['application/json', 'multipart/form-data', 'text/html', 'application/x-www-form-urlencoded', 'text/plain']
// }
// let _wafjs = new WAFJS(baseConfig);
//
// app.use(async (req, res, next) => {
//     if (_wafjs.reqCheck(req.method, req.headers['content-type'])){
//         console.log('---->', req.method, 'headers:', req.headers)
//
//         res.status(403).send();
//         return;
//     }
//     next();
// });

app.use(cookieParser());
app.use(express.json());

app.use('/customers', apiLimiter, customerRoutes());
app.use('/restaurant-owners', apiLimiter, restaurantOwnerRoutes());
app.use('/admins', apiLimiter, adminRoutes());
app.use('/users', apiLimiter, usersRoutes());
app.use('/restaurants', apiLimiter, restaurantRoutes());
app.use('/products', apiLimiter, productRoutes());

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// export const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
//     port: 5432,
//     ssl: true
// });

export const pool = new Pool({
    user: 'lastrestoadmin',
    password: 'LW154DKery3TfZvOADMRNZn8uE6dEG4H',
    host: 'dpg-cjevboqvvtos73erm6ig-a.oregon-postgres.render.com',
    database: 'lastrestodb',
    port: 5432,
    ssl: true
});

pool.connect((error: Error) => {
    if (error) {
        console.error('Error connecting to PostgreSQL database: ', error);
        return;
    }
    console.log('Connected to PostgreSQL database :)');
});
// pool.query('SELECT NOW()', (queryError: Error, result: QueryResult) => {
//     if (queryError) {
//         console.error('Error executing query: ', queryError);
//         return;
//     }
//     console.log('Current timestamp from PostgreSQL:', result.rows[0].now);
// });










