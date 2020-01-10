require('dotenv').config();

const TrackersServices = require('./services/trackers_services');
const SpotServices = require('./services/spot_services');
const GarminServices = require('./services/garmin_services');

async function start() {

    const allTrackers = await TrackersServices.getAllTrackers();

    let insertStatement = '';

    for (let tracker of allTrackers) {
        switch (tracker.trkType) {
            case 'spot':
                try {
                    console.log("Need to grab data from SPOT");
                    let string = await SpotServices.getTrackingData(tracker.id, tracker.trkLink);
                    insertStatement = insertStatement.concat(string);
                } catch (e) {
                    console.log(e)
                }
                break;
            case 'inreach':
                try {
                    console.log("Need to grab data from Garmin");
                    let string = await GarminServices.getTrackingData(tracker.id, tracker.trkLink);
                    insertStatement = insertStatement.concat(string);
                } catch (e) {
                    console.log(e);
                }
                break;
        }
    }
    console.log('Final String:', insertStatement);

    // Need to remove trailing comma and replace with semicolon

    // Take insert string with all the tracking data and save it to db
}

start();









// exports.handler = async (event, context) => {
//     try {
//         const allTrackers = await TrackersServices.getAllTrackers();
//         console.log(allTrackers);
//     } catch (err) {
//         console.log(err);
//     }
// }
