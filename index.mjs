/**
 * Root module use to run server and combine all modules
 * 
 * @file index.mjs
 * @author SachchidanandY
**/
import express from 'express';
import passport from 'passport';
import passportGoogleOauth20 from 'passport-google-oauth20';
import { GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_OAUTH_CALLBACK_URL,
    ENV,
    PORT
} from './lib/config';

const app = express();
const Strategy = passportGoogleOauth20.Strategy;

//Bind Google OAuth strategy with passport
passport.use(
    new Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_OAUTH_CALLBACK_URL
    }, (accessTocken, refreshToken, profile, done) => {
        console.log('Access Tocken = ', accessTocken);
        console.log('refreshToken = ', refreshToken);
        console.log('profile = ', profile);
        console.log('Access done = ', done);
    })
);

app.get('/auth/google', 
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(PORT, () => {
    console.log(`Server running at port : ${PORT} in ${ENV} environment`);
});
