const checkAuth = require('../middleware/check-auth');
const DatabaseController = require('../controllers/database_controller');
const UsersController = require('../controllers/users_controller');

// Since we do not have access to the app variable from this file. This is how we export the routes to be used by the express app in app.js
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

}