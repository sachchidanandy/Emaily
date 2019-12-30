/**
 * Auth controller contail all authentication related actions
 *
 * @file auth.mjs
 * @author SachchidanandY
*/

import { createAuthToken } from '../helpers/';

// Handles Google OAuth
export const googleAuth = (req, res) => {
    console.log('User Registered');
};

// Handle Google OAuth callback
export const googleAuthCallback = async (req, res) => {
    const token = await createAuthToken(req.user);
    return token ? res.status(200).json({token})
        : res.status(500).json({error : 'Something went wrong'});
};
