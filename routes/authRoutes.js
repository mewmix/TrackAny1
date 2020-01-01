const passport = require('passport');

module.exports = (app) => {

    // Google
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => { // Remember to set session to false. We can also add a successRedirect:'/something' and a failureRedirect:'/something'
        // res.redirect('/');
        res.status(200).json({ status: "Nominal!", description: "Google Oauth was a Success", userData: req.user });
    });

    // Facebook
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
        res.status(200).json({ status: "Nominal!", description: "Facebook Oauth was a Success", userData: req.user });
    });
        
}