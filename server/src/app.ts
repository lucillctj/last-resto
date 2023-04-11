import express, { Express } from 'express';
import mysql, {QueryError} from 'mysql2';
import dotenv from 'dotenv';
import {customerRoutes} from "./routes/customerRoutes.js";
import {restaurantOwnerRoutes} from "./routes/restaurantOwnerRoutes.js";
import {restaurantRoutes} from "./routes/restaurantRoutes.js";
import {productRoutes} from "./routes/productRoutes.js";
import {adminRoutes} from "./routes/adminRoutes.js";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use('/api/v1/customer', customerRoutes());
app.use('/api/v1/restaurant-owner', restaurantOwnerRoutes());
app.use('/api/v1/admin', adminRoutes());
app.use('/api/v1/restaurant', restaurantRoutes());
app.use('/api/v1/product', productRoutes());

// app.use(cors());


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
    console.log('Connected to MySQL database');
});










