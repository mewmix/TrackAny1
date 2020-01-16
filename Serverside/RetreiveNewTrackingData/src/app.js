require('dotenv').config();
const axios = require('axios');

const TrackersServices = require('./services/trackers_services');
const PingsServices = require('./services/pings_services');
const FormatUrlsService = require('./services/format_urls');
const GarminServices = require('./services/garmin_services');
const SpotServices = require('./services/spot_services');

// async function start() {     // DEV
exports.handler = async (event) => {
    const t0 = Date.now();

    const allTrackers = await TrackersServices.getAllTrackers();

    let promises = [];

    for (let i = 0; i < allTrackers.length; i++) {
        promises[i] = axios.get(FormatUrlsService.formatFinalUrl(allTrackers[i].trkType, allTrackers[i].trkLink, t0));
    }

    const results = await Promise.all(promises);
    const t1 = Date.now();
    console.log(`http requests for all trackers took ${t1 - t0} miliseconds`)

    let insertStatement = 'INSERT IGNORE INTO pings(unixTime, lat, lng, alt, velocity, heading, txtMsg, isEmergency, tracker_id, user_id) VALUES ';

    for (let i = 0; i < allTrackers.length; i++) {
        if (allTrackers[i].trkType === 'inreach') {
            let string = await GarminServices.createGarminInsertStatement(allTrackers[i].id, allTrackers[i].owner_id, results[i]);
            insertStatement = insertStatement.concat(string);
        } else {
            let string = await SpotServices.createSpotInsertStatement(allTrackers[i].id, allTrackers[i].owner_id, results[i]);
            insertStatement = insertStatement.concat(string);
        }
    }

    insertStatement = insertStatement.slice(0, -1).concat(";");
    const t2 = Date.now();
    console.log(`Results from all trackers took ${t2 - t1} miliseconds to format into a single string`)

    try {
        const rowsAffected = await PingsServices.saveAllTrackingData(insertStatement);
        const t3 = Date.now();
        console.log(`Rows affected: ${rowsAffected}. Finished in ${t3 - t0} miliseconds.`)
    } catch (e) {
        console.log("Error thrown when trying to insert all tracking data:", e)
    }

    console.log('Final String:', insertStatement);
}





// }     // DEV
// start();     // DEV