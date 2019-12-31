const db = require('../db');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',   // We may have to make this a definite path instead of a relative path. Use https in prod
    proxy: true    // Might not need this ?
},
    // This callback function is automatically called when the user is re-directed back to our app from the google Oauth flow.
    // This is where we need to check for an existing user with a matching google-user-id. If we dont find one we create a new user and log them in.
    (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile:', profile);

        let findUserQuery = `SELECT * FROM users WHERE googleID=? limit 1;`;

        db.query(findUserQuery, profile.id, (err, result) => {
            if (result.length === 0) {    // Create a new user
                let newUserStatement = `INSERT INTO ${process.env.DB_DATABASE}.users (googleID, fName, lName, email, picture) VALUES (?, ?, ?, ?, ?);`;

                db.query(newUserStatement, [profile.id, profile.name.givenName, profile.name.familyName, profile.emails[0].value, profile.photos[0].value], (err, result) => {
                    if (!err) {
                        console.log(`New user has been created with id of ${result.insertId}.`);
                        done(null, result.insertId);
                    }
                });
            } else {    // Login existing user
                console.log(`User ${result[0].id} should be logged in.`);
                console.log(result[0]);
                done(null, result[0].id);    // We need to call done() with 2 arguments. 1) An error, but in our case null. 2) The object we saved, the user. We call done(null, user) if we create a user or if we login as user.
            }
        });
    }
));