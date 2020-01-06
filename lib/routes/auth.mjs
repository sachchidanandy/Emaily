/**
 * Module handles all routes related to auth
 * 
 * @file auth.mjs
 * @author SachchidanandY
*/

import express from 'express';
import { googleAuthCallback } from '../controller/authController';
// import passportConfig, but can also use passport directly from dependency. 
import passportConfig from '../config/passportConfig';
import addSocketIdToSession from '../middleware/addSocketIdToSession';

const authRouter = express.Router();

// Route to handle Google OAuth
authRouter.get('/google',
    addSocketIdToSession,
    passportConfig.authenticate('google', {
        session: false,
        scope: ['profile', 'email']
    })
);

// Route to handle Google OAuth callback
authRouter.get('/google/callback',
    passportConfig.authenticate('google',
        {session: false}
    ),
    googleAuthCallback
);

export default authRouter;
