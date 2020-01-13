/**
 * Auth controller contail all authentication related actions
 *
 * @file auth.mjs
 * @author SachchidanandY
*/

import { createAuthToken } from '../helpers/';

// Handle Google OAuth callback
export const googleAuthCallback = async (req, res) => {
    const io = req.app.get('io')
    const token = await createAuthToken(req.user.id);
    if (!token) {
        return io.in(req.session.socketId).emit('google', false);
    }

    // Create user object
    const {display_name, email, first_name, last_name, awatar, credits} = Object.assign(req.user);
    return io.in(req.session.socketId).emit('google', {
        display_name,
        email,
        first_name,
        last_name,
        awatar,
        token,
        credits
    });
};
