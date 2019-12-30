/**
 * Module handles all routes related to user
 *
 * @file user.mjs
 * @author SachchidanandY
*/

import express from 'express';
import { getUserInfo } from '../controller/userController';

const userRoutes = express.Router();

// Function to return user info
userRoutes.get('/info', getUserInfo);

export default userRoutes;
