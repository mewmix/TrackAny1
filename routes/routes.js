const checkAuth = require('../middleware/check-auth');
const DatabaseController = require('../controllers/database_controller');
const UsersController = require('../controllers/users_controller');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


module.exports = (app) => {

    // Health Status
    app.get('/api/v1/status', (req, res) => {
        res.status(200).json({ status: "Nominal!", description: "Track Pilots Node.js & Express API running on AWS Lambda through API Gateway Proxy" });
    });

    // Database Routes
    app.get('/api/v1/database/init', DatabaseController.initDatabase);
    app.get('/api/v1/database/addtables', DatabaseController.addTables);
    app.get('/api/v1/database/mockusers', DatabaseController.addMockUsers);

    // User Routes
    app.get('/api/v1/users', UsersController.getAllUsers);

    // Oauth Routes
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        (accessToken, refreshToken, profile, done) => {
            console.log('access token', accessToken);
            console.log('refresh token', refreshToken);
            console.log('profile:', profile);
        }
    ));

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
    app.get('/auth/google/callback', passport.authenticate('google'));

}