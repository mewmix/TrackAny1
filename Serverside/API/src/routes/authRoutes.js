const passport = require('passport');

module.exports = (app) => {

    // Google
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {   // We can also add a successRedirect:'/something' and a failureRedirect:'/something'
        // res.status(200).json({ status: "Nominal!", description: "Google Oauth was a Success", userData: req.user });
        res.redirect(`https://trackany1.com/oauth2/callback#access_token=${req.user}`);
    });

    // Facebook
    app.get('/auth/facebook', passport.authenticate('facebook'));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', { session: false }), (req, res) => {
        res.status(200).json({ status: "Nominal!", description: "Facebook Oauth was a Success", userData: req.user });
    });
        
}