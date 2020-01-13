/**
 * User controller contail all user related actions
 *
 * @file userController.mjs
 * @author SachchidanandY
*/

import { SUCCESS } from '../constants/statusCode';

export const getUserInfo = (req, res) => {
    // Create user object
    const {display_name, email, first_name, last_name, awatar, credits} = Object.assign(req.user);

    //Send back user info
    res.status(SUCCESS).json({display_name, email, first_name, last_name, awatar, credits});
};
