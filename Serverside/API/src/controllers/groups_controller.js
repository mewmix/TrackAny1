const GroupsServices = require('../services/groups_services');

module.exports = {
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

            const groupMembers = await GroupsServices.getGroupRoster(id);

            let allData = [];
            for (let member of groupMembers) {
                const userTrackingData = await GroupsServices.getUserTrackingData(member.id, queryTill);
                allData.push({member: member, userTrackingData});
            }

            return res.status(200).json({ allData });
        } catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to get group tracking data' });
        }
    }
}