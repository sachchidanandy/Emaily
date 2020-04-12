/**
 * File contains error code and message
 *
 * @file errorResponse.mjs
 * @author SachchidanandY
*/

export const SOMETHING_BROKE = {
    code: 3001,
    message: 'Something went wrong. Please try after sometime!'
};
export const JWT_MISSING = {
    code: 3002,
    message: "Authorization token missing in header."
};
export const JWT_INVALID = {
    code: 3003,
    message: "Invalid authorization token."
};
export const JWT_EXPIRED = {
    code: 3004,
    message: "Authorization token expired."
};
export const USER_NOT_FOUND = {
    code: 3005,
    message: "User don't exist."
};
export const PAYMENT_TOKEN_MISSING = {
    code: 3006,
    message: "Invalid request payment token missing."
};
export const CARD_DETAIL_MISSING = {
    code: 3007,
    message: "Sorry, card's details missing."
};
export const AMOUNT_MISSING = {
    code: 3008,
    message: "Sorry, ammount missing."
};
export const GET_STRIPE_ERROR = (err) => {
    switch (err.type) {
        case 'StripeCardError':
            // A declined card error => e.g. "Your card's expiration year is invalid."
            return {
                code: 3009,
                message: err.message
            };
        case 'StripeRateLimitError':
            // Too many requests made to the API too quickly
            return {
                code: 3010,
                message: err.message
            };
        case 'StripeInvalidRequestError':
            // Invalid parameters were supplied to Stripe's API
            return {
                code: 3011,
                message: err.message
            };
        case 'StripeAPIError':
            // An error occurred internally with Stripe's API
            return {
                code: 3012,
                message: err.message
            };
        case 'StripeConnectionError':
            // Some kind of error occurred during the HTTPS communication
            return {
                code: 3013,
                message: err.message
            };
        case 'StripeAuthenticationError':
            // You probably used an incorrect API key
            return {
                code: 3014,
                message: err.message
            };
        default:
            // Handle any other types of unexpected errors
            return {
                code: 3015,
                message: err.message
            };
    }
};
export const INSUFFICIENT_CREDIT = {
    code: 3016,
    message: "Sorry, insufficient please add credits."
};
export const JOI_SCHEMA_MISSING = {
    code: 3017,
    message: "Sorry, something went wrong. Please try after sometime."
};
export const GET_REQUEST_BODY_VALIDATION_ERROR = (err) => {
    return {
        code: 3018,
        message: err.details.length > 0 ? err.details[0].message.replace(/"/g, '')
            : 'Invalid request, please check request body'
    }
};
export const ERROR_SENDING_SERVEY = {
    code: 3019,
    message: "Can't send servey. Please try after sometime."
};
export const ERROR_WHILE_SAVING_SERVEY = {
    code: 3020,
    message: "Unable to create servey. Please try after sometime."
};