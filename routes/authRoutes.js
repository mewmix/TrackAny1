const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', passport.authenticate('google', {session: false}), (req, res) => { // Remember to set session to false. We can also add a successRedirect:'/something' and a failureRedirect:'/something'
        // res.redirect('/');
        res.status(200).json({ status: "Nominal!", description: "Google Oauth was a Success", userData: req.user});
    });
}