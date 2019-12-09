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

// Route to handle Google OAuth
authRouter.get('/google', 
    passportConfig.authenticate('google', {
        session: false,
        scope: ['profile', 'email']
    }), () => {
        console.log('User Registered');
    }
);

// Route to handle Google OAuth callback
authRouter.get('/google/callback',
    passportConfig.authenticate('google',
        {session: false}
    ),(req, res) => {
        // Todo Create JWT token and Send back to user
        res.send({"TOKEN" : "SEND TOKEN TO USER"});
    }
);

export default authRouter;
