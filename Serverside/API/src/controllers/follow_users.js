const FollowUser = require('../services/followUsers/followUser');
const UnfollowUser = require('../services/followUsers/unfollowUser');
const GetUsersFollowers = require('../services/followUsers/getUsersFollowers');
const GetUsersFollowees = require('../services/followUsers/getUsersFollowees');

module.exports = {
    async followUser(req, res) {
        try {
            const userID = req.userData.id;
            const followeeID = req.params.id;

            await FollowUser.followUser(userID, followeeID);
            return res.status(201).json({ message: `You are now following user ${followeeID}` });
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to follow user' });
        }
    },
    async unfollowUser(req, res) {
        try {
            const userID = req.userData.id;
            const followeeID = req.params.id;

            await UnfollowUser.unfollowUser(userID, followeeID);
            return res.status(200).json({ message: `You have unfollowed user ${followeeID}` });
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to unfollow user' });
        }
    },
    async getUsersFollowers(req, res) {
        try {
            const userID = req.userData.id;

            const followers = await GetUsersFollowers.getUsersFollowers(userID);

            return res.status(200).json(followers);
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to get followers' });
        }
    },
    async getUsersFollowees(req, res) {
        try {
            const userID = req.userData.id;

            const followees = await GetUsersFollowees.getUsersFollowees(userID);

            return res.status(200).json(followees);
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to get followers' });
        }
    }
}