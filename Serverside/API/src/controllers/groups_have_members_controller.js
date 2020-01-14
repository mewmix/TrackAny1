const AddToRoster = require('../services/groupsHaveMembers/addToRoster');
const RemoveFromRoster = require('../services/groupsHaveMembers/removeFromRoster');
const GetGroupMember = require('../services/groupsHaveMembers/getGroupMember');

module.exports = {
    async addToRoster(req, res) {
        try {
            const userID = req.userData.id;
            const { group_id } = req.body;

            const newMemberID = await AddToRoster.addToRoster(group_id, userID);

            return res.status(201).json({ member_id: newMemberID, message: `User added to group` });

        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to add user to group` });
        }
    },
    async removeFromRoster(req, res) {
        try {
            const userID = req.userData.id;
            const { group_id } = req.params;

            const groupMemberToBeDeleted = await GetGroupMember.getGroupMember(group_id, userID);

            if (groupMemberToBeDeleted.member_id == userID) {
                await RemoveFromRoster.removeFromRoster(group_id, userID);
                res.status(200).json({ message: `group member was removed` });
            } else {
                res.status(401).json({ message: `Failed to remove group member. You do not have the authority.` });
            }
        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to remove group member` });
        }
    }
}