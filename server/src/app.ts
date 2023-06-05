import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import mysql, {QueryError} from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import {customerRoutes} from "./routes/customerRoutes";
import {restaurantOwnerRoutes} from "./routes/restaurantOwnerRoutes";
import {restaurantRoutes} from "./routes/restaurantRoutes";
import {productRoutes} from "./routes/productRoutes";
import {adminRoutes} from "./routes/adminRoutes";
import {usersRoutes} from "./routes/usersRoutes";
import {verifyAuth} from "./middleware/auth";

dotenv.config();

const app: Express = express();

const corsOptions = {
    origin: 'http://localhost:4200',
    credentials: true
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());



app.use('/api/v1/customers', customerRoutes());
app.use('/api/v1/restaurant-owners', restaurantOwnerRoutes());
app.use('/api/v1/admins', adminRoutes());
app.use('/api/v1/users', usersRoutes());
app.use('/api/v1/restaurants', restaurantRoutes());
app.use('/api/v1/products', productRoutes());

export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

db.connect((error: QueryError | null) => {
    if (error) {
        console.error('Error connecting to MySQL database: ', error);
        return;
    }
    console.log('Connected to MySQL database :)');
});










