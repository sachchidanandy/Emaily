/**
 * Handles oprations related to JWT
 *
 * @file jsonWebToken.mjs
 * @author SachchidanandY
*/

import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../config/index.mjs';
import { PUBLIC_KEY } from '../config/index.mjs';

const signOptions = {
    issuer:  'Emaily Pvt Ltd.',
    subject:  'Auth-token',
    audience:  'https:emaily.in',
    expiresIn:  "1h",
    algorithm:  "RS256"
};

const verifyOptions = {
    issuer:  'Emaily Pvt Ltd.',
    subject:  'Auth-token',
    audience:  'https:emaily.in',
    expiresIn:  "1h",
    algorithm:  ["RS256"]
};

// Function to create JWT
export const createJWT = async (payload) => {
    const token = jwt.sign(payload, PRIVATE_KEY, signOptions);
    return token || false;
};

// Function to validate JWT and return payload
export const validateJWt = async (token) => {
    let payload, errorName = false;
    try {
        payload = jwt.verify(token, PUBLIC_KEY, verifyOptions);
    } catch (error) {
        errorName = error['name'] ? error['name'] : false;
        console.error(error);
    }
    return { payload, errorName };
};
