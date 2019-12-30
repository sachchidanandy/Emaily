/**
 * Combile all route file and expose them
 * 
 * @file index.mjs
 * @author SachchidanandY
*/

import express from 'express';
import authRoute from './auth';
import userRoute from './user';
import authMiddleware from '../middleware/JwtValidator';

const routeHandler = express.Router();

// Handles auth related routes
routeHandler.use('/auth', authRoute);

// Handle user related routes
routeHandler.use('/user', authMiddleware, userRoute);

// Handle user related routes
routeHandler.use('/test',authMiddleware, (req, res) => {
    res.send({"MESSAGE" : "LOL IT'S WORKING"});
});

export default routeHandler;
