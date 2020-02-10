/**
 * Servey controller contail all servey related actions
 *
 * @file serveyController.mjs
 * @author SachchidanandY
*/

import { validateRequestBody } from '../helpers/reqBodyValidator';

export const createServey = (req, res) => {
    const user = req.user;

    // Validate input values
    const {validationError, validationErrorMessage, value} = validateRequestBody('createServey', req.body);
    if (validationError) {
        return res.status(validationErrorMessage['httpStatus']).json(validationErrorMessage['message']);
    }
    // Create servey object

    // Send servey email to recipients

    // Save servey in database

    // Reduce one credit from credit

    // Update user details

    // Send success response
};
