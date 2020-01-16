// https://www.sitepoint.com/spa-social-login-google-facebook/
// https://scotch.io/tutorials/easy-node-authentication-facebook

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');

const FindOauthUser = require('../services/users/findOauthUser');
const CreateUser = require('./users/createUser');

// Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",     // REMEMBER TO REMOVE /DEV WHEN IN PROD
    proxy: true
},
    (accessToken, refreshToken, profile, done) => {

        const googleID = profile.id;

        FindOauthUser.findOauthUser(googleID, 'google').then((existingUser) => {

            if (existingUser === undefined) {   // Create new user

                const { givenName, familyName } = profile.name;
                const email = profile.emails[0].value;
                const photo = profile.photos[0].value;

                CreateUser.createUser(givenName, familyName, email, photo, googleID, null).then((newUserID) => {

                    const newUser = { id: newUserID, fName: givenName, lName: familyName }
                    token = jwt.sign(newUser, process.env.JWT_SECRET);
                    done(null, token);

                }).catch((err) => {
                    return done(err);
                });

            } else {    // Login existing user
                const payload = { id: existingUser.id, fName: existingUser.fName, lName: existingUser.lName }
                token = jwt.sign(payload, process.env.JWT_SECRET);
                done(null, token);
            }
        }).catch((err) => {
            return done(err);
        });
    }
));


// Facebook
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",     // REMEMBER TO REMOVE /DEV WHEN IN PROD
    profileFields: ["emails", "name", "photos"],
    proxy: true
},
    (accessToken, refreshToken, profile, done) => {

        const facebookID = profile.id;

        FindOauthUser.findOauthUser(facebookID, 'facebook').then((existingUser) => {

            if (existingUser === undefined) {   // Create new user

                const { givenName, familyName } = profile.name;

                CreateUser.createUser(givenName, familyName, null, null, null, facebookID).then((newUserID) => {

                    const payload = { id: newUserID, fName: givenName, lName: familyName }
                    token = jwt.sign(payload, process.env.JWT_SECRET);
                    done(null, token);

                }).catch((err) => {
                    return done(err);
                });

            } else {    // Login existing user
                const payload = { id: existingUser.id, fName: existingUser.fName, lName: existingUser.lName }
                token = jwt.sign(payload, process.env.JWT_SECRET);
                done(null, token);
            }
        }).catch((err) => {
            return done(err);
        });
    }
));