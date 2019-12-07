/**
 * Module handles all routes related to auth
 * 
 * @file auth.mjs
 * @author SachchidanandY
*/

import express from 'express';
// import passportConfig, but can also use passport directly from dependency. 
import passportConfig from '../config/passportConfig';
const authRouter = express.Router();

authRouter.get('/google', 
    passportConfig.authenticate('google', {
        scope: ['profile', 'email']
    })
);

authRouter.get('/google/callback', passportConfig.authenticate('google'));

export default authRouter;
