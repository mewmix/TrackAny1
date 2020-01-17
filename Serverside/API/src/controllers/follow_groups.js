const FollowGroup = require('../services/followGroups/followGroup');
const UnfollowGroup = require('../services/followGroups/unfollowGroup');
const GetUsersFollowedGroups = require('../services/followGroups/getUsersFollowedGroups');
const GetGroupsFollowers = require('../services/followGroups/getGroupsFollowers');

module.exports = {
    async followGroup(req, res) {
        try {
            const userID = req.userData.id;
            const groupID = req.params.id;

            await FollowGroup.followGroup(userID, groupID);
            return res.status(201).json({ message: `You are now following group ${groupID}` });
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to follow group' });
        }
    },
    async unfollowGroup(req, res) {
        try {
            const userID = req.userData.id;
            const groupID = req.params.id;

            await UnfollowGroup.unfollowGroup(userID, groupID);
            return res.status(200).json({ message: `You are no longer following group ${groupID}` });
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to unfollow group' });
        }
    },
    async getUsersFollowedGroups(req, res) {
        try {
            const userID = req.userData.id;

            const groups = await GetUsersFollowedGroups.getUsersFollowedGroups(userID);

            return res.status(200).json(groups);
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed get the groups the user follows' });
        }
    },
    async getGroupsFollowers(req, res) {
        try {
            const groupID = req.params.id;

            const followers = await GetGroupsFollowers.getGroupsFollowers(groupID);

            return res.status(200).json(followers);
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed get groups followers' });
        }
    }
}