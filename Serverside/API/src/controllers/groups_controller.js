const CreateGroup = require('../services/groups/createGroup');
const GetAllGroups = require('../services/groups/getAllGroups');
const GetSingleGroup = require('../services/groups/getSingleGroup');
const UpdateGroup = require('../services/groups/updateGroup');
const DeleteGroup = require('../services/groups/deleteGroup');
const GetGroupTrackingData = require('../services/groups/getGroupTrackingData');
const GetGroupRoster = require('../services/groups/getGroupRoster');

module.exports = {
    async createGroup(req, res) {
        try {
            const userID = req.userData.id;
            const { groupName, info, lat, lng, address, city, county, stateAbbr, state, countryAbbr, country, postal } = req.body;

            const newGroupID = await CreateGroup.createGroup(userID, groupName, info, lat, lng, address, city, county, stateAbbr, state, countryAbbr, country, postal);
            return res.status(201).json({ id: newGroupID, message: `Group created with id: ${newGroupID}` });            
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to create new group' });
        }
    },
    async getAllGroups(req, res) {
        try {
            const allGroups = await GetAllGroups.getAllGroups();
            return res.status(200).json(allGroups);

        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to get all groups' });
        }
    },
    async getSingleGroup(req, res) {
        try {
            const { id } = req.params;
            const group = await GetSingleGroup.getSingleGroup(id);
            return res.status(200).json(group);
        } catch (e) {
            return res.status(500).json({ error: e, message: `Failed to get group: ${id}` });
        }
    },
    async updateGroup(req, res) {
        try {
            const userID = req.userData.id;
            const { groupName, info, id } = req.body;

            const groupToUpdate = await GetSingleGroup.getSingleGroup(id);

            if(groupToUpdate.creatorID == userID) {
                await UpdateGroup.updateGroup(groupName, info, id);
                return res.status(200).json({ message: `Group ${id} was successfully updated`});
            } else {
                res.status(401).json({ message: `Failed to update group: ${id}. You do not have the authority.` });
            }
        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to update group: ${id}` });
        }
    },
    async deleteGroup(req, res) {
        try {
            const userID = req.userData.id;
            const { id } = req.params;

            const groupToBeDeleted = await GetSingleGroup.getSingleGroup(id);

            if (groupToBeDeleted.creatorID == userID) {
                await DeleteGroup.deleteGroup(id);
                res.status(200).json({ message: `group: ${id} was successfully deleted` });
            } else {
                res.status(401).json({ message: `Failed to delete group: ${id}. You do not have the authority.` });
            }
        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to delete group: ${id}` });
        }
    },
    async getGroupTrackingData(req, res) {
        try {
            const { id, timespan } = req.params;
            const currentUnix = Math.floor(Date.now() / 1000);
            let queryTill;

            switch (timespan) {
                case 'mostrecent':
                    console.log("Need to get most recent")
                    break;
                case '1hr':
                    queryTill = currentUnix - 3600;
                    break;
                case '2hr':
                    queryTill = currentUnix - 7200;
                    break;
                case '6hr':
                    queryTill = currentUnix - 21600;
                    break;
                case '12hr':
                    queryTill = currentUnix - 43200;
                    break;
                case '24hr':
                    queryTill = currentUnix - 86400;
                    break;
                case '48hr':
                    queryTill = currentUnix - 172800;
                    break;
                case '1week':
                    queryTill = currentUnix - 604800;
                    break;
                case '2weeks':
                    queryTill = currentUnix - 1209600;
                    break;
                case 'all':
                    queryTill = 1;
                    break;
                default:
                    return res.status(400).json({ error: e, message: 'Failed to get group tracking data bad request' });
            }

            const groupTrackingData = await GetGroupTrackingData.getGroupTrackingData(id, queryTill);

            return res.status(200).json(groupTrackingData);
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to get group tracking data' });
        }
    },
    async getGroupRoster(req, res) {
        try {
            const { id } = req.params;
            const roster = await GetGroupRoster.getGroupRoster(id);
            return res.status(200).json(roster);
            
        } catch (e) {
            return res.status(500).json({ error: e, message: `Failed to get group roster: ${id}` });
        }
    }
}