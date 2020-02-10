/**
 * Module handles all routes related to servey
 *
 * @file servey.mjs
 * @author SachchidanandY
*/

import express from 'express';
import checkCredit from '../middleware/checkCredit';
import { createServey } from '../controller/serveyController';

const serveyRoutes = express.Router();

serveyRoutes.post('/create-servey', checkCredit, createServey);

export default serveyRoutes;
