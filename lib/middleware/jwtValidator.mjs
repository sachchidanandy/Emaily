/**
 * Middleware to validate JWT
 *
 * @file jwtValidator.mjs
 * @author SachchidanandY
*/

import { validateJWt } from '../helpers/jsonWebToken';
import { JWT_MISSING,
    JWT_INVALID,
    JWT_EXPIRED,
    SOMETHING_BROKE,
    USER_NOT_FOUND
} from '../constants/errorResponse';
import { UNAUTHORIZED, INTERNAL_SERVER_ERROR } from '../constants/statusCode';
import User from '../models/User';

const JWT_ERROR_NAME = {
    TokenExpiredError: JWT_EXPIRED,
    JsonWebTokenError: JWT_INVALID
};

export default async (req, res, next) => {
    // Get auth token from request header
    const authToken = req.get('authorization') ? req.get('authorization') : false;
    // Check if auth token is present
    if(!authToken) {
        return res.status(UNAUTHORIZED).json(JWT_MISSING);
    }

    // Validate tocken
    const { payload, errorName } = await validateJWt(authToken);
    if (!payload) {
        const errorMessage = errorName && JWT_ERROR_NAME.hasOwnProperty(errorName)
            ? JWT_ERROR_NAME[errorName] : JWT_INVALID;
        return res.status(UNAUTHORIZED).json(errorMessage);
    }

    // Get userID from payload
    const uid = payload['uid'] ? payload['uid'] : false;
    if (!uid) {
        return res.status(INTERNAL_SERVER_ERROR).json(SOMETHING_BROKE);
    }

    // Fetch user info from DB and set it into request
    const user = await User.findById(uid);
    if (!user) {
        return res.status(BAD_REQUEST).json(USER_NOT_FOUND);
    }
    req.user = user;

    next();
};
