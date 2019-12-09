/**
 * Collect helper functions
 *
 * @file helper.mjs
 * @author SachchidanandY
*/

import User from '../models/User';

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
