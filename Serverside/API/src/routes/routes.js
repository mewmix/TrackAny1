const checkAuth = require('../middleware/check-auth');  // Use to protect each route with JWT
const UsersController = require('../controllers/users_controller');
const TrackersController = require('../controllers/trackers_controller');
const GroupsController = require('../controllers/groups_controller');
const GroupsHaveMembersController = require('../controllers/groups_have_members_controller');
const FollowGroups = require('../controllers/follow_groups');
const FollowUsers = require('../controllers/follow_users');

// Since we do not have access to the app variable from this file. This is how we export the routes to be used by the express app in app.js
module.exports = (app) => {

    // Home Route
    app.get('/', (req, res) => {
        res.status(200).json({ status: "Nominal!", description: "Home Page" });
    });

    // Postman API Documentation
    app.get('/docs', (req, res) => res.redirect('https://documenter.getpostman.com/view/4885205/SWLmYk58?version=latest'));

    // Health Status
    app.get('/api/v1/status', (req, res) => {
        res.status(200).json({ status: "Nominal!", description: "Track Pilots Node.js & Express API running on AWS Lambda through API Gateway Proxy" });
    });

    // Protected Route
    app.get('/api/v1/protected', checkAuth, (req, res) => {
        res.status(200).json({ status: "Nominal!", description: "Protected Resource" });
    });

    // User Routes
    app.post('/api/v1/users', checkAuth, UsersController.createUser);
    app.get('/api/v1/users', UsersController.getAllUsers);
    app.get('/api/v1/users/:id', checkAuth, UsersController.getSingleUser);
    app.put('/api/v1/users', checkAuth, UsersController.updateUser);
    app.delete('/api/v1/users', checkAuth, UsersController.deleteUser);

    // Tracker Routes
    app.post('/api/v1/trackers', checkAuth, TrackersController.createTracker);
    app.get('/api/v1/trackers', TrackersController.getAllTrackers);
    app.get('/api/v1/trackers/:id', checkAuth, TrackersController.getSingleTracker);
    app.put('/api/v1/trackers', checkAuth, TrackersController.updateTracker);
    app.delete('/api/v1/trackers/:id', checkAuth, TrackersController.deleteTracker);
    app.get('/api/v1/userstrackers', checkAuth, TrackersController.getUsersTrackers);

    // Group Routes
    app.post('/api/v1/groups', checkAuth, GroupsController.createGroup);
    app.get('/api/v1/groups', GroupsController.getAllGroups);
    app.get('/api/v1/groups/:id', checkAuth, GroupsController.getSingleGroup);
    app.put('/api/v1/groups', checkAuth, GroupsController.updateGroup);
    app.delete('/api/v1/groups/:id', checkAuth, GroupsController.deleteGroup);
    // Special Group Routes
    app.get('/api/v1/grouptrackingdata/:id/:timespan', GroupsController.getGroupTrackingData);
    app.get('/api/v1/grouproster/:id', GroupsController.getGroupRoster);

    // Groups Have Members Routes
    app.post('/api/v1/groupmembers', checkAuth, GroupsHaveMembersController.addToRoster);
    app.delete('/api/v1/groupmembers/:id', checkAuth, GroupsHaveMembersController.removeFromRoster);

    // Users Follow Users
    app.post('/api/v1/followuser/:id', checkAuth, FollowUsers.followUser);
    app.delete('/api/v1/followuser/:id', checkAuth, FollowUsers.unfollowUser);
    app.get('/api/v1/usersfollowers', checkAuth, FollowUsers.getUsersFollowers);
    app.get('/api/v1/usersfollowees', checkAuth, FollowUsers.getUsersFollowees);

    // Users Follow Groups
    app.post('/api/v1/followgroup/:id', checkAuth, FollowGroups.followGroup);
    app.delete('/api/v1/followgroup/:id', checkAuth, FollowGroups.unfollowGroup);
    app.get('/api/v1/groupsfollowers/:id', FollowGroups.getGroupsFollowers);
    app.get('/api/v1/followgroups', checkAuth, FollowGroups.getUsersFollowedGroups);

}