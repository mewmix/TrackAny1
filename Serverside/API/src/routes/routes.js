const checkAuth = require('../middleware/check-auth');  // Use to protect each route with JWT
const UsersController = require('../controllers/users_controller');
const TrackersController = require('../controllers/trackers_controller');
const GroupsController = require('../controllers/groups_controller');
const GroupsHaveMembersController = require('../controllers/groups_have_members_controller');

// Since we do not have access to the app variable from this file. This is how we export the routes to be used by the express app in app.js
module.exports = (app) => {

    // Home Route
    app.get('/', (req, res) => {
        res.status(200).json({ status: "Nominal!", description: "Home Page" });
    });

    // Health Status
    app.get('/api/v1/status', (req, res) => {
        res.status(200).json({ status: "Nominal!", description: "Track Pilots Node.js & Express API running on AWS Lambda through API Gateway Proxy" });
    });

    // Protected Route
    app.get('/api/v1/protected', checkAuth, (req, res) => {
        res.status(200).json({ status: "Nominal!", description: "Protected Resource" });
    });

    // User Routes
    app.post('/api/v1/users', UsersController.createUser);
    app.get('/api/v1/users', UsersController.getAllUsers);
    app.get('/api/v1/users/:id', UsersController.getSingleUser);
    app.put('/api/v1/users', checkAuth, UsersController.updateUser);
    app.delete('/api/v1/users', checkAuth, UsersController.deleteUser);

    // Tracker Routes
    app.post('/api/v1/trackers', checkAuth, TrackersController.createTracker);
    app.get('/api/v1/trackers', TrackersController.getAllTrackers);
    app.get('/api/v1/trackers/:id', TrackersController.getSingleTracker);
    app.put('/api/v1/trackers', checkAuth, TrackersController.updateTracker);
    app.delete('/api/v1/trackers/:id', checkAuth, TrackersController.deleteTracker);

    // Group Routes
    app.post('/api/v1/groups', checkAuth, GroupsController.createGroup);
    app.get('/api/v1/groups', GroupsController.getAllGroups);
    app.get('/api/v1/groups/:id', GroupsController.getSingleGroup);
    app.put('/api/v1/groups', checkAuth, GroupsController.updateGroup);
    app.delete('/api/v1/groups/:id', checkAuth, GroupsController.deleteGroup);
    // Special Group Routes
    app.get('/api/v1/grouptrackingdata/:id/:timespan', GroupsController.getGroupTrackingData);
    app.get('/api/v1/grouproster/:id', GroupsController.getGroupRoster);

    // Groups Have Members Routes
    app.post('/api/v1/groupmembers', checkAuth, GroupsHaveMembersController.addToRoster);
    app.delete('/api/v1/groupmembers/:id', checkAuth, GroupsHaveMembersController.removeFromRoster);

}