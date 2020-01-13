/**
 * Module handles all routes related to payment
 *
 * @file payment.mjs
 * @author SachchidanandY
*/

import express from 'express';
import { addCredits } from '../controller/paymentController';

const paymentRoutes = express.Router();

// Function to return user info
paymentRoutes.post('/add-credits', addCredits);

export default paymentRoutes;
