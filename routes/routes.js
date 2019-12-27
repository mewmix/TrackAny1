const checkAuth = require('../middleware/check-auth');
const DatabaseController = require('../controllers/database_controller');


module.exports = (app) => {

    // Health Status
    app.get('/api/v1/status', (req, res) => {
        res.status(200).json({ status: "Nominal!", description: "Track Pilots Node.js & Express API running on AWS Lambda through API Gateway Proxy" });
    });

    // Database Routes
    app.get('/api/v1/database/init', DatabaseController.initDatabase);
    app.get('/api/v1/database/addtables', DatabaseController.addTables);
    app.get('/api/v1/database/mockusers', DatabaseController.addMockUsers);
}