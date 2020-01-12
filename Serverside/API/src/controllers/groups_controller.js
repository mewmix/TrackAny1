const GroupsServices = require('../services/groups_services');

module.exports = {
    async getGroupTrackingData(req, res) {
        try {
            const { id, timespan } = req.params;
            const groupTrackingData = await GroupsServices.getGroupTrackingData(id, timespan);
            return res.status(200).json({ groupTrackingData });
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to get group tracking data' });
        }
    }
}