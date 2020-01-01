// https://www.sitepoint.com/spa-social-login-google-facebook/

const db = require('../db');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',   // We may have to make this a definite path instead of a relative path. Use https in prod
    proxy: true    // Might not need this ?
},
    // This callback function is automatically called when the user is re-directed back to our app from the google Oauth flow.
    // This is where we need to check for an existing user with a matching google-user-id. If we dont find one we create a new user and log them in.
    (accessToken, refreshToken, profile, done) => {

        let findUserQuery = `SELECT * FROM users WHERE googleID=? limit 1;`;

        db.query(findUserQuery, profile.id, (err, result) => {
            if (err) throw err;

            if (result.length === 0) {    // Create a new user

                let newUserStatement = `INSERT INTO ${process.env.DB_DATABASE}.users (googleID, fName, lName, email, picture) VALUES (?, ?, ?, ?, ?);`;

                db.query(newUserStatement, [profile.id, profile.name.givenName, profile.name.familyName, profile.emails[0].value, profile.photos[0].value], (err, result) => {
                    if (err) throw err;
                    
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