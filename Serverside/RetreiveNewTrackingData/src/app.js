require('dotenv').config();

const TrackersServices = require('./services/trackers_services');
const SpotServices = require('./services/spot_services');
const GarminServices = require('./services/garmin_services');
const PingsServices = require('./services/pings_services');

async function start() {

    const allTrackers = await TrackersServices.getAllTrackers();

    let insertStatement = 'INSERT IGNORE INTO pings(unixTime, lat, lng, alt, velocity, heading, txtMsg, isEmergency, tracker_id) VALUES ';

    for (let tracker of allTrackers) {
        switch (tracker.trkType) {
            case 'inreach':
                try {
                    console.log("Need to grab data from Garmin");
                    let string = await GarminServices.getTrackingData(tracker.id, tracker.trkLink);
                    insertStatement = insertStatement.concat(string);
                } catch (e) {
                    console.log("Error thrown from Garmin function:", e);
                }
                break;
            case 'spot':
                try {
                    console.log("Need to grab data from SPOT");
                    let string = await SpotServices.getTrackingData(tracker.id, tracker.trkLink);
                    insertStatement = insertStatement.concat(string);
                } catch (e) {
                    console.log("Error thrown from SPOT function:", e)
                }
                break;
        }
    }

    insertStatement = insertStatement.slice(0, -1).concat(";");

    try {
        const rowsAffected = await PingsServices.saveAllTrackingData(insertStatement);
        console.log(rowsAffected)
    } catch (e) {
        console.log("Error thrown when trying to insert all tracking data:", e)
    }

    // console.log('Final String:', insertStatement);
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
