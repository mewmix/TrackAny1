const CreateTracker = require('../services/trackers/createTracker');
const GetAllTrackers = require('../services/trackers/getAllTrackers');
const GetSingleTracker = require('../services/trackers/getSingleTracker');
const UpdateTracker = require('../services/trackers/updateTracker');
const DeleteTracker = require('../services/trackers/deleteTracker');

module.exports = {
    async createTracker(req, res) {
        try {
            const userID = req.userData.id;
            const { trkType, trkLink, trkName, trkModel } = req.body;

            const newTrackerID = await CreateTracker.createTracker(userID, trkType, trkLink, trkName, trkModel);
            return res.status(201).json({ id: newTrackerID, message: `Tracker created with id: ${newTrackerID}` });            
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to create new tracker' });
        }
    },
    async getAllTrackers(req, res) {
        try {
            const allTrackers = await GetAllTrackers.getAllTrackers();
            return res.status(200).json(allTrackers);

        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to get all trackers' });
        }
    },
    async getSingleTracker(req, res) {
        try {
            const { id } = req.params;
            const tracker = await GetSingleTracker.getSingleTracker(id);
            return res.status(200).json(tracker);
        } catch (e) {
            return res.status(500).json({ error: e, message: `Failed to get tracker: ${id}` });
        }
    },
    async updateTracker(req, res) {
        try {
            const userID = req.userData.id;
            const { id, trkType, trkLink, trkName } = req.body;

            const trackerToUpdate = await GetSingleTracker.getSingleTracker(id);

            if(trackerToUpdate.owner_id == userID) {
                await UpdateTracker.updateTracker(id, trkType, trkLink, trkName);
                return res.status(200).json({ message: `Tracker ${id} was successfully updated`});
            } else {
                res.status(401).json({ message: `Failed to update tracker: ${id}. You do not have the authority.` });
            }
        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to update tracker: ${trackerID}` });
        }
    },
    async deleteTracker(req, res) {
        try {
            const userID = req.userData.id;
            const { id } = req.params;

            const trackerToBeDeleted = await GetSingleTracker.getSingleTracker(id);

            if (trackerToBeDeleted.owner_id == userID) {
                await DeleteTracker.deleteTracker(id);
                res.status(200).json({ message: `tracker: ${id} was successfully deleted` });
            } else {
                res.status(401).json({ message: `Failed to delete tracker: ${id}. You do not have the authority.` });
            }
        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to delete tracker: ${id}` });
        }
    },
}