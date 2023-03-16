// import {Request, Response} from "express";
// import {db} from "../app.js";
// import {Customer} from "../models/customer";
// import {ResultSetHeader} from "mysql2";
// import {User} from "../models/users";
//
// export class CustomerController {
//     public static async getCustomers(req: Request, res: Response): Promise<void> {
//         try {
//             db.query(
//                 "SELECT * FROM customer",
//                 function (error: Error | null, results: ResultSetHeader) {
//                     return res.status(200).send(results);
//                 })
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({message: "Internal server error"});
//         }
//     }
//
//     public static async getCustomerById(req: Request, res: Response): Promise<void> {
//         const requestId = parseInt(req.params.id);
//         try {
//             db.query(
//                 `SELECT * FROM customer WHERE customer_id = ${requestId}`,
//                 (error: Error | null, results: any) => {
//
//                     if (error) throw error;
//                     else if (results.length === 0) {
//                         res.status(404).send("Id doesn't exist or doesn't have the right format");
//                     }
//                     else {
//                         res.status(200).send(results);
//                     }
//                 })
//         } catch (error) {
//             res.status(500).json({message: "Internal server error"});
//         }
//     }
//
//     // public static async getCustomerById(req: Request, res: Response): Promise<void> {
//     //     const requestId = parseInt(req.params.id);
//     //     try {
//     //         db.query(
//     //             `SELECT * FROM customer WHERE customer_id = ${requestId}`,
//     //             (error: Error | null, results: any) => {
//     //                 if (error) throw error;
//     //                 else if (results.length === 0) {
//     //                     res.status(404).send("Id doesn't exist or doesn't have the right format");
//     //                 } else {
//     //                     res.status(200).send(results);
//     //                 }
//     //             });
//     //
//     //         db.query(
//     //             `SELECT * FROM user WHERE user_id = ${requestId}`,
//     //             (error: Error | null, results: any) => {
//     //                 if (error) throw error;
//     //                 else if (results.length === 0) {
//     //                     res.status(404).send("Id doesn't exist or doesn't have the right format");
//     //                 }
//     //                 else {
//     //                     res.status(200).send(results);
//     //                 }
//     //             });
//     //     }
//     //     catch (error) {
//     //         console.log(error);
//     //         res.status(500).json({message: "Internal server error"});
//     //     }
//     // }
//
//     public static async createCustomer(req: Request, res: Response, body: any, newUser: User): Promise<void> {
//         try {
//             db.execute(
//                 `INSERT INTO user (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)`,
//                 [newUser.firstName, newUser.lastName, newUser.email, newUser.phone, newUser.password, 'customer'], async (error: any, results: any) => {
//                     if (error) {
//                         console.log(error);
//                         res.status(400);
//                         res.send("User already exist or doesn't have the right format");
//                         return error;
//                     } else {
//                         const newCustomer: Customer = {
//                             customerId: results.insertId,
//                             address: body.address,
//                             postCode: body.post_code,
//                             city: body.city,
//                         }
//                         await db.execute(`INSERT INTO customer (customer_id, address, post_code, city) VALUES (?,?,?,?)`, [newCustomer.customerId, newCustomer.address, newCustomer.postCode, newCustomer.city]);
//                         await db.execute(`SELECT user.user_id, user.first_name, user.last_name, user.email, user.phone, customer.address, customer.post_code, customer.city, customer.product_id
//                                                FROM user
//                                                JOIN customer ON user.user_id = customer.customer_id
//                                                WHERE user.user_id = ?`, [results.insertId]);
//                         res.status(201).send('Customer created!');
//                     }
//                 })
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({message: "Internal server error"});
//         }
//     }
//
//     // public static async createCustomer(req: Request, res: Response): Promise<void> {
//     //     const body = req.body;
//     //     const newUser: User = {
//     //         firstName: body.first_name,
//     //         lastName: body.last_name,
//     //         email: body.email,
//     //         phone: body.phone,
//     //         password: body.password,
//     //         role: body.role
//     //     };
//     //     try {
//     //         if (newUser.role === 'customer') {
//     //             db.execute(
//     //                 `INSERT INTO user (first_name, last_name, email, phone, password, role) VALUES (?, ?, ?, ?, ?, ?)`,
//     //                 [newUser.firstName, newUser.lastName, newUser.email, newUser.phone, newUser.password, 'customer'], async (error: any, results: any) => {
//     //                     if (error) {
//     //                         console.log(error);
//     //                         res.status(400);
//     //                         res.send("User already exist or doesn't have the right format");
//     //                         return error;
//     //                     } else {
//     //                         const newCustomer: Customer = {
//     //                             customerId: results.insertId,
//     //                             address: body.address,
//     //                             postCode: body.post_code,
//     //                             city: body.city,
//     //                         }
//     //                         await db.execute(`INSERT INTO customer (customer_id, address, post_code, city) VALUES (?,?,?,?)`, [newCustomer.customerId, newCustomer.address, newCustomer.postCode, newCustomer.city]);
//     //                         await db.execute(`SELECT user.user_id, user.first_name, user.last_name, user.email, user.phone, customer.address, customer.post_code, customer.city, customer.product_id
//     //                                               FROM user
//     //                                               JOIN customer ON user.user_id = customer.customer_id
//     //                                               WHERE user.user_id = ?`, [results.insertId]);
//     //                         res.status(201).send('Join created!');
//     //                     }
//     //                 })
//     //         }
//     //         else if (newUser.role === 'admin') {
//     //             console.log('role admin')
//     //         } else if (newUser.role === 'restaurant owner') {
//     //             console.log('role restaurant owner')
//     //         } else {
//     //             res.status(400).json({error: 'Role invalid'});
//     //         }
//     //     } catch (error) {
//     //         console.log(error);
//     //         res.status(500).json({message: "Internal server error"});
//     //     }
//     // }
//
//     public static async updateCustomer(req: Request, res: Response): Promise<void> {
//         const body = req.body;
//         const requestId = parseInt(req.params.id);
//         const updateCustomer: Customer = {
//             customerId: requestId,
//             address: body.address,
//             postCode: body.post_code,
//             city: body.city
//         };
//         try {
//             db.execute(
//                 `UPDATE customer SET address = ?, post_code = ?, city = ? WHERE customer_id = ${requestId}`,
//                 [updateCustomer.address, updateCustomer.postCode, updateCustomer.city], (error: any, results: any) => {
//                     if (error) throw error;
//                     else if (results.affectedRows === 0) {
//                         res.status(404).send("Id doesn't exist or doesn't have the right format");
//                     }
//                     else {
//                         res.status(201).send('Customer updated!');
//                     }
//                 })
//         }
//         catch (error){
//             console.log(error);
//             res.status(500).json({message: "Internal server error"});
//         }
//     }
//
//     public static async deleteCustomer(req: Request, res: Response): Promise<void> {
//         const requestId = parseInt(req.params.id);
//         try {
//             db.query(
//                 `DELETE FROM customer WHERE customer_id = ${requestId}`, (error: Error | null, results: ResultSetHeader) => {
//                     if (error) throw error;
//
//                     else if (results.affectedRows === 0) {
//                         res.status(404).send("Id doesn't exist or doesn't have the right format");
//                     }
//                     else {
//                         res.status(200).send('Customer deleted!');
//                     }
//                 })
//         }
//         catch (error){
//             console.log(error);
//             res.status(500).json({message: "Internal server error"});
//         }
//     }
// }
//
