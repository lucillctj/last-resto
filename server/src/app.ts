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
import helmet from 'helmet';

dotenv.config();

const app: Express = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};
app.use(cors(corsOptions));

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(helmet());

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

// export const db = mysql.createConnection(process.env.DB_URL ?? '');
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


db.connect((error: QueryError | null) => {
    if (error) {
        console.error('Error connecting to MySQL database: ', error);
        return;
    }
    console.log('Connected to MySQL database :)');
});










