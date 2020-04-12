/**
 * Servey controller contail all servey related actions
 *
 * @file serveyController.mjs
 * @author SachchidanandY
*/

import { validateRequestBody } from '../helpers/reqBodyValidator';
import Servey from '../models/Servey';
import Mailer from '../services/Mailer.mjs';
import { SUCCESS, INTERNAL_SERVER_ERROR } from '../constants/statusCode';
import { ERROR_SENDING_SERVEY, ERROR_WHILE_SAVING_SERVEY, SOMETHING_BROKE } from '../constants/errorResponse';

export const createServey = async (req, res) => {
    const user = req.user;
    let updatedUserObj = {};

    // Validate input values
    const {validationError, validationErrorMessage, value} = validateRequestBody('createServey', req.body);
    if (validationError) {
        return res.status(validationErrorMessage['httpStatus']).json(validationErrorMessage['message']);
    }
    // Create servey object
    const { title, subject, body, recipient_list } = value;
    const recipientListObjectArray = recipient_list.map(email => ({email}));
    const serveyObject = new Servey({ title, subject, body, recipient_list: recipientListObjectArray, _user: user.id });

    // Send servey email to recipients
    const mailerObject = new Mailer({ subject, recipients: recipient_list }, body);
    const mailerResponse = await mailerObject.send();
    if (mailerResponse.statusCode != 202) {
        console.log('Error while sending main :', mailerResponse);
        return res.status(INTERNAL_SERVER_ERROR).json(ERROR_SENDING_SERVEY);
    }
    serveyObject.sendgrid_header = mailerResponse.headers;

    try {
        // Save servey in database
        const serveyData = await serveyObject.save();
        if (!serveyData) {
            return res.status(INTERNAL_SERVER_ERROR).json(ERROR_WHILE_SAVING_SERVEY);
        }

        // Reduce credits from user
        user['credits'] = user['credits'] - 1;
        updatedUserObj = await user.save();
        if (!serveyData) {
            return res.status(INTERNAL_SERVER_ERROR).json(SOMETHING_BROKE);
        }

    } catch (error) {
        console.log(error);
        return res.status(INTERNAL_SERVER_ERROR).json(SOMETHING_BROKE);
    }
    // Create user object
    const {display_name, email, first_name, last_name, awatar, credits} = updatedUserObj;

    //Send back user info
    res.status(SUCCESS).json({display_name, email, first_name, last_name, awatar, credits});
};
