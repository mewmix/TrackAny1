// https://www.sitepoint.com/spa-social-login-google-facebook/
// https://scotch.io/tutorials/easy-node-authentication-facebook

const db = require('../db');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');

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

        let findUserQuery = `SELECT * FROM users WHERE googleID=? limit 1;`;

        db.query(findUserQuery, profile.id, (err, result) => {
            if (err) return done(err);

            if (result.length === 0) {    // Create a new user

                let newUserStatement = `INSERT INTO ${process.env.DB_DATABASE}.users (googleID, fName, lName, email, picture) VALUES (?, ?, ?, ?, ?);`;

                db.query(newUserStatement, [profile.id, profile.name.givenName, profile.name.familyName, profile.emails[0].value, profile.photos[0].value], (err, result) => {
                    if (err) return done(err);

                    if (!err) {

                        const newUser = { id: result.insertId }

                        token = jwt.sign(newUser, process.env.JWT_SECRET);

                        done(null, token);
                    }
                });
            } else {    // Login existing user

                const existingUser = {
                    id: result[0].id,
                    fName: result[0].fName,
                    lName: result[0].lName,
                    picture: result[0].picture,
                    created: result[0].created
                }

                token = jwt.sign(existingUser, process.env.JWT_SECRET);

                done(null, token);    // We need to call done() with 2 arguments. 1) An error, but in our case null. 2) The object we saved, the user. We call done(null, user) if we create a user or if we login as user.
            }
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
        console.log("Facebook profile is:")
        console.log(profile);

        let findUserQuery = `SELECT * FROM users WHERE facebookID=? limit 1;`;

        db.query(findUserQuery, profile.id, (err, result) => {
            if (err) return done(err);

            if (result.length === 0) {    // Create a new user

                let newUserStatement = `INSERT INTO ${process.env.DB_DATABASE}.users (facebookID, fName, lName) VALUES (?, ?, ?);`;

                db.query(newUserStatement, [profile.id, profile.name.givenName, profile.name.familyName], (err, result) => {
                    if (err) return done(err);

                    if (!err) {

                        const newUser = { id: result.insertId, fName: profile.name.givenName, lName: profile.name.familyName }

                        token = jwt.sign(newUser, process.env.JWT_SECRET);

                        done(null, token);
                    }
                });
            } else {    // Login existing user

                const existingUser = {
                    id: result[0].id,
                    fName: result[0].fName,
                    lName: result[0].lName,
                }

                token = jwt.sign(existingUser, process.env.JWT_SECRET);

                done(null, token);
            }
        });
    }
));