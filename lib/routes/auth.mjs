/**
 * Module handles all routes related to auth
 * 
 * @file auth.mjs
 * @author SachchidanandY
*/

import express from 'express';
// import passportConfig, but can also use passport directly from dependency. 
import passportConfig from '../config/passportConfig';
import { createAuthToken } from '../helpers/';
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
    ),async (req, res) => {
        const token = await createAuthToken(req.user);
        return token ? res.status(200).json({token})
            : res.status(500).json({error : 'Something went wrong'});
    }
);

export default authRouter;
