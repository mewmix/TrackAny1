const TrackersServices = require('./services/trackers_services');

exports.handler = async (event, context) => {
    try {
        const allTrackers = await TrackersServices.getAllTrackers();
        console.log(allTrackers);
    } catch (err) {
        console.log(err);
    }
}