require('dotenv').config();
const axios = require('axios');

const TrackersServices = require('./services/trackers_services');
const PingsServices = require('./services/pings_services');
const FormatUrlsService = require('./services/format_urls');
const GarminServices = require('./services/garmin_services');
const SpotServices = require('./services/spot_services');

async function start() {     // DEV
// exports.handler = async (event) => {
    try {
        const t0 = Date.now();
        const db = await require('./db').connect();
        const trackers = await TrackersServices.getAllTrackers(db);
        const responses = await getTrackerResponses(t0, trackers);
        const insertStatement = await createInsertStatement(trackers, responses);
        const rowsAffected = await PingsServices.saveAllTrackingData(db, insertStatement);
        console.log('Finished. Rows Affected:', rowsAffected);
        // process.exit(1);    // DEV
    } catch (e) {
        console.log('Retreive Tracking Data Lambda Function threw an error:', e);
    }
}

async function getTrackerResponses(time, trackers) {
    let promises = [];

    for (let i = 0; i < trackers.length; i++) {
        promises[i] = axios.get(FormatUrlsService.formatFinalUrl(trackers[i].trkType, trackers[i].trkLink, time));
    }

    const results = await Promise.all(promises);
    return results;
}

async function createInsertStatement(trackers, responses) {
    let insertStatement = 'INSERT IGNORE INTO pings(unixTime, lat, lng, alt, velocity, heading, txtMsg, isEmergency, tracker_id, user_id) VALUES ';

    let trackerInsertStatements = '';

    for (let i = 0; i < trackers.length; i++) {
        // Check and see if response is empty
        if (responses[i].status !== 200) {
            continue;
        }

        if (trackers[i].trkType === 'inreach') {
            let string = await GarminServices.createGarminInsertStatement(trackers[i].id, trackers[i].owner_id, responses[i]);
            trackerInsertStatements = trackerInsertStatements.concat(string);
        } else {
            let string = await SpotServices.createSpotInsertStatement(trackers[i].id, trackers[i].owner_id, responses[i]);
            trackerInsertStatements = trackerInsertStatements.concat(string);
        }
    }
    if (trackerInsertStatements === '') {
        console.log("None of the devices have any new data to save to the database, exit program here.")
        process.exit(1);
    }
    
    insertStatement = insertStatement.concat(trackerInsertStatements);

    insertStatement = insertStatement.slice(0, -1).concat(";");
    console.log('Final String:', insertStatement);
    return insertStatement;
}

start();     // DEV