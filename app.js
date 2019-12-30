require('dotenv').config(); // Dev

// const sls = require('serverless-http') // Prod
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('./middleware/cors');
const routes = require('./routes/routes');
const errorHandler = require('./middleware/error-handler');
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors);

// Routes
routes(app);

// Error Handler
app.use(errorHandler);

app.listen(8080, () => console.log('App running on http://localhost:8080/api/v1/status')); // Dev
// module.exports.server = sls(app) // Prod