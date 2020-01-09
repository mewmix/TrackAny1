const TrackersServices = require('../services/trackers_services');

module.exports = {
    async createTracker(req, res) {
        try {
            const userID = req.userData.id;
            const { trkType, trkLink, trkName } = req.body;

            const newTrackerID = await TrackersServices.createTracker(userID, trkType, trkLink, trkName);
            return res.status(201).json({ id: newTrackerID, message: `Tracker created with id: ${newTrackerID}` });            
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to create new tracker' });
        }
    },
    async getAllTrackers(req, res) {
        try {
            const allTrackers = await TrackersServices.getAllTrackers();
            return res.status(200).json({ trackers: allTrackers });

        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to get all trackers' });
        }
    },
    async getSingleTracker(req, res) {
        try {
            const { id } = req.params;
            const tracker = await TrackersServices.getSingleTracker(id);
            return res.status(200).json({tracker});
        } catch (e) {
            return res.status(500).json({ error: e, message: `Failed to get tracker: ${id}` });
        }
    },
    async updateTracker(req, res) {
        try {
            const userID = req.userData.id;
            const { id, trkType, trkLink, trkName } = req.body;

            const trackerToUpdate = await TrackersServices.getSingleTracker(id);

            if(trackerToUpdate.owner_id == userID) {
                await TrackersServices.updateTracker(id, trkType, trkLink, trkName);
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

            const trackerToBeDeleted = await TrackersServices.getSingleTracker(id);

            if (trackerToBeDeleted.owner_id == userID) {
                await TrackersServices.deleteTracker(id);
                res.status(200).json({ message: `tracker: ${id} was successfully deleted` });
            } else {
                res.status(401).json({ message: `Failed to delete tracker: ${id}. You do not have the authority.` });
            }
        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to delete tracker: ${id}` });
        }
    },
}