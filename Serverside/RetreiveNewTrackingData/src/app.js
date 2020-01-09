require('dotenv').config();

const TrackersServices = require('./services/trackers_services');

// exports.handler = async (event, context) => {
//     try {
//         const allTrackers = await TrackersServices.getAllTrackers();
//         console.log(allTrackers);
//     } catch (err) {
//         console.log(err);
//     }
// }

// TrackersServices.getAllTrackers().then((res) => {
//     console.log(res);
// }).catch((err) => {
//     console.log(err);
// });

// I need to pu in some mock trackers