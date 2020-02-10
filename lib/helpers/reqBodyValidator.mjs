/**
 * Collect Schemas and validation functions
 *
 * @file joiRequestBodyValidator.mjs
 * @author SachchidanandY
*/

import Joi from '@hapi/joi';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../constants/statusCode';
import { JOI_SCHEMA_MISSING, GET_REQUEST_BODY_VALIDATION_ERROR } from '../constants/errorResponse';

const actionsSchema = {
    createServey: Joi.object({
        title: Joi.string().min(2).required(),
        subject: Joi.string().min(2).required(),
        body: Joi.string().min(2).required(),
        recipients_list: [Joi.string().email()]
    })
}

export const validateRequestBody = (schemaName, requestBody) => {
    let validationError, validationErrorMessage = false;
    const joiSchema = actionsSchema[schemaName] ? actionsSchema[schemaName] : false;
    if (!joiSchema) {
        validationError = true;
        validationErrorMessage = {
            httpStatus: INTERNAL_SERVER_ERROR,
            message: JOI_SCHEMA_MISSING
        };
    }

    const { error, value } = joiSchema.validate(requestBody);
    if (error) {
        validationError = true;
        validationErrorMessage = {
            httpStatus: BAD_REQUEST,
            message: GET_REQUEST_BODY_VALIDATION_ERROR(error)
        }
    }

    return {validationError, validationErrorMessage, value};
};
