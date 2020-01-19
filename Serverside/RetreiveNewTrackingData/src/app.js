require('dotenv').config();
const axios = require('axios');
const dateFormat = require('dateformat');
const xml2js = require('xml2js');


async function start() {     // DEV
    // exports.handler = async (event) => {
    try {
        const t0 = Date.now();

        const db = await require('./db').connect();
        const trackers = await getAllTrackers(db);
        const responses = await getTrackerResponses(t0, trackers);
        const insertStatement = await createInsertStatement(trackers, responses);
        const rowsAffected = await saveTrackingData(db, insertStatement);

        console.log('Finished. Rows Affected:', rowsAffected);
        // process.exit(1);    // DEV
    } catch (e) {
        console.log('Retreive Tracking Data Lambda Function threw an error:', e);
    }
}


async function getAllTrackers(db) {
    try {
        const [rows] = await db.execute('SELECT id, trkType, trkLink, owner_id FROM trackers;')
        return rows
    } catch (e) {
        throw e
    }
}

function formatFinalUrl(trkType, trkLink, currentUnixTime) {
    const miliSecInDay = 86400 * 1000;
    const daysAgo = miliSecInDay * 14;
    if (trkType === 'inreach') {
        const timeAgo = new Date(currentUnixTime - (daysAgo));
        dateFormat.masks.garmin = 'yyyy-mm-dd"T"HH:MM"Z"';
        const garminFormatedDate = dateFormat(timeAgo, 'garmin');
        return `${trkLink}?d1=${garminFormatedDate}`;
    } else {
        const timeAgo = new Date(currentUnixTime - (daysAgo));
        dateFormat.masks.spot = 'yyyy-mm-dd"T"HH:MM:ss"-0000"';
        const spotFormatedDate = dateFormat(timeAgo, 'spot');
        return `${trkLink}/message.json?startDate=${spotFormatedDate}`;
    }
}

async function getTrackerResponses(time, trackers) {
    let promises = [];

    for (let i = 0; i < trackers.length; i++) {
        promises[i] = axios.get(formatFinalUrl(trackers[i].trkType, trackers[i].trkLink, time));
    }

    const results = await Promise.all(promises);
    return results;
}

async function createGarminInsertStatement(deviceID, userID, result) {
    const parser = new xml2js.Parser();
    const rawData = await parser.parseStringPromise(result.data);

    // Need to look at response and see if there is anything before we start parsing data
    if (rawData === null) {
        console.log(`Tracker: ${deviceID}'s tracking link might not be valid. The response is completely empty.`)
        return '';
    }

    if (rawData.kml.Document[0].Folder === undefined) {
        console.log(`Garmin tracker ${deviceID} does not have any new data.`)
        return '';
    }

    const p = rawData.kml.Document[0].Folder[0].Placemark;

    let insertStatement = '';

    for (let i = 0; i < p.length - 1; i++) {

        let unix = Math.floor(new Date(p[i].TimeStamp[0].when[0]).getTime() / 1000);
        let lat = p[i].ExtendedData[0].Data[8].value[0];
        let lng = p[i].ExtendedData[0].Data[9].value[0];
        let alt = (p[i].Point[0].coordinates[0]).split(",")[2];
        let velocity = p[i].ExtendedData[0].Data[11].value[0];
        let heading = p[i].ExtendedData[0].Data[12].value[0];
        let message = p[i].ExtendedData[0].Data[15].value[0];
        let emergency = p[i].ExtendedData[0].Data[14].value[0];

        insertStatement = insertStatement.concat(`(${unix}, ${lat}, ${lng}, ${alt}, "${velocity}", "${heading}", "${message}", "${emergency}", ${deviceID}, ${userID}),`);
    }
    return insertStatement;
}

async function createSpotInsertStatement(deviceID, userID, res) {

    if (res.data.response.errors !== undefined) {
        let { error } = res.data.response.errors;
        if (error.text === 'No Messages to display') {
            console.log(`Spot tracker ${deviceID} does not have any new data.`);
            return '';
        } else if (error.text === 'Feed Not Found') {
            console.log(`Spot tracker ${deviceID}'s URL is not working.`);
            return '';
        } else if (error.text === 'Date/Time format is incorrect.') {
            console.log(`Spot tracker ${deviceID} is thowing a Date/Time format error but just ignore it.`)
        }
        else {
            console.log(`Spot tracker ${deviceID} threw an unrecognized error.`, error)
            return '';
        }
    }

    const dataPoints = res.data.response.feedMessageResponse.messages.message;

    let insertStatement = '';

    for (let p of dataPoints) {
        let message = '';
        if (p.messageContent !== undefined) { message = p.messageContent }
        insertStatement = insertStatement.concat(`(${p.unixTime}, ${p.latitude}, ${p.longitude}, ${p.altitude}, "n/a", "n/a", "${message}", "n/a", ${deviceID}, ${userID}),`);
    }
    return insertStatement;
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
            let string = await createGarminInsertStatement(trackers[i].id, trackers[i].owner_id, responses[i]);
            trackerInsertStatements = trackerInsertStatements.concat(string);
        } else {
            let string = await createSpotInsertStatement(trackers[i].id, trackers[i].owner_id, responses[i]);
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

async function saveTrackingData(db, sqlStatement) {
    try {
        const [result] = await db.execute(sqlStatement)
        return result.affectedRows
    } catch (e) {
        throw e
    }
}

start();     // DEV*