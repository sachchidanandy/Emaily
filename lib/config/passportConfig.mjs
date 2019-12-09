/**
 * Configure passport for app
 * 
 * @file passportConfig.js
 * @author SachchidanandY
*/

import passport from 'passport';
import passportGoogleOauth20 from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_CALLBACK_URL } from './';
import { handleGoogleAuth } from '../helpers';

const Strategy = passportGoogleOauth20.Strategy;

//Bind Google OAuth strategy with passport
passport.use(
    new Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_OAUTH_CALLBACK_URL
    }, (accessTocken, refreshToken, profile, done) => {
        const profileData = profile['_json'];
        handleGoogleAuth(profileData, done);
    })
);

export default passport;
