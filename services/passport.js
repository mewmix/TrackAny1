// https://www.sitepoint.com/spa-social-login-google-facebook/
// https://scotch.io/tutorials/easy-node-authentication-facebook

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');

const UsersServices = require('../services/users_services');

// Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/dev/auth/google/callback",     // REMEMBER TO REMOVE /DEV WHEN IN PROD
    proxy: true    // Might not need this ?
},
    // This callback function is automatically called when the user is re-directed back to our app from the google Oauth flow.
    // This is where we need to check for an existing user with a matching google-user-id. If we dont find one we create a new user and log them in.
    (accessToken, refreshToken, profile, done) => {

        UsersServices.findGoogleUser(profile.id).then((existingUser) => {

            if (existingUser === undefined) {   // Create new user

                const { givenName, familyName } = profile.name;
                const email = profile.emails[0].value;
                const photo = profile.photos[0].value;
                const googleID = profile.id;

                UsersServices.createUser(givenName, familyName, email, photo, googleID, null).then((newUserID) => {

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
    callbackURL: "/dev/auth/facebook/callback",     // REMEMBER TO REMOVE /DEV WHEN IN PROD
    profileFields: ["emails", "name", "photos"],
    proxy: true
},
    (accessToken, refreshToken, profile, done) => {

        const facebookID = profile.id;

        UsersServices.findFacebookUser(facebookID).then((existingUser) => {

            if (existingUser === undefined) {   // Create new user

                const { givenName, familyName } = profile.name;

                UsersServices.createUser(givenName, familyName, null, null, null, facebookID).then((newUserID) => {

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