import express, { Express } from 'express';
import mysql, {QueryError} from 'mysql2';
import dotenv from 'dotenv';
import {usersRoutes} from "./routes/usersRoutes.js";
import {restaurantsRoutes} from "./routes/restaurantsRoutes";
import {productsRoutes} from "./routes/productsRoutes";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use('/api/v1', usersRoutes());
app.use('/api/v1', restaurantsRoutes());
app.use('/api/v1', productsRoutes());

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










