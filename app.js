require('dotenv').config(); // Dev

// const sls = require('serverless-http') // Prod
const express = require('express');
const cors = require('./middleware/cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./middleware/error-handler');
const passport = require('passport'); // ??????????
const app = express();

require('./services/passport'); // The passport config file does not return anything. Which is why we dont have to assign it to a const.

// Middleware
app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize()); // ????????????

// Routes
require('./routes/routes')(app);
require('./routes/authRoutes')(app); // When we require the authRoutes file it returns a function because that's what we exported from that file. We then immediatley call that function with the app object. The app is passed into that arrow function, we attach the 2 route handlers to it and the routes are registered. This is just a shorter syntax for registering those routes. We no longer have to assign this to a const to then be called in the next line of code. Instead it's just required and called immediately.

// Error Handler
app.use(errorHandler);

app.listen(8080, () => console.log('App running on http://localhost:8080/api/v1/status')); // Dev
// module.exports.server = sls(app) // Prod

// killall -9 node if port is already in use