/**
 * Middleware to validate account credit should be greater than 0
 *
 * @file checkCredit.mjs
 * @author SachchidanandY
*/

import { PAYMENT_REQ } from '../constants/statusCode';
import { INSUFFICIENT_CREDIT } from '../constants/errorResponse';

export default (req, res, next) => {
    if (!req.user.credits) {
        return res.status(PAYMENT_REQ).json(INSUFFICIENT_CREDIT);
    }
    next();
};
