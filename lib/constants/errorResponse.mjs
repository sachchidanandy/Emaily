/**
 * File contains error code and message
 *
 * @file errorResponse.mjs
 * @author SachchidanandY
*/

export const SOMETHING_BROKE = {
    code: 3001,
    message: 'Something broke!'
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
