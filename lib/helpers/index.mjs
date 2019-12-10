/**
 * Collect helper functions
 *
 * @file helper.mjs
 * @author SachchidanandY
*/

import User from '../models/User';
import crypto from 'crypto';
import { SECRET, ENCRYPTION_ALGO } from '../config/'
import { createJWT } from './jsonWebToken.mjs';

export const handleGoogleAuth = async (profileData, done) => {
    // Check if user already exists
    const userExist = await User.findOne({ googleId: profileData['sub'] });
    userExist ? done(null, userExist.id) : new User({
        googleId: profileData['sub'],
        display_name: profileData['name'],
        email: profileData['email'],
        first_name: profileData['given_name'],
        last_name: profileData['family_name'],
        awatar: profileData['picture']
    }).save().then(userData => {
        done(null, userData.id);
    }).catch(err => {
        console.log("Error : ", err);
    });
};

// Create encrypted string
export const ecryptString = async (rawString) => {
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGO, SECRET, iv);

    let encrypted = cipher.update(rawString);
    encrypted += cipher.final('hex');

    // return encrypted:iv
    return `${encrypted}:${iv}`;
};

// Create raw string from encrypted string
export const decryptString = async (encryptedString) => {
    const encryptedStringViArray = encryptedString.split(':');
    const encString = encryptedStringViArray[0];
    const iv = encryptedStringViArray[1] || false;
    const decipher = iv ? crypto.createDecipheriv(ENCRYPTION_ALGO, SECRET, iv)
        : crypto.createDecipher(ENCRYPTION_ALGO, SECRET);
    let rawString = decipher.update(encString, 'hex', 'utf8');
    rawString += decipher.final('utf8');

    return rawString;
};

// Generate Auth token
export const createAuthToken = async (userId=false) => {
    let token = false;
    if (userId) {
        token = await createJWT({uid:userId});
    }
    return token;
};
