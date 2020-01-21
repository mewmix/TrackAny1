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
        const pingsArray = await createPingsArray(trackers, responses, t0);
        console.log(pingsArray)

        if (pingsArray.length === 0) {
            console.log("None of the trackers have new data to insert. Stop Execution Here!")
            return
        }

        const elevations = await getElevationData(pingsArray);
        const finalPingsArray = await addElevationToPingsArray(pingsArray, elevations);
        const insertStatement = await createInsertStatement(finalPingsArray);
        const rowsAffected = await saveTrackingData(db, insertStatement);

        console.log('Finished. Rows Affected:', rowsAffected);
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
    // const miliSecInDay = 86400 * 1000;
    // const daysAgo = miliSecInDay * 14; // Use when getting 2 weeks worth
    const minAgo = (1000 * 60) * process.env.TIME_SPAN_IN_MINUTES;   // Use when getting 20 min worth
    if (trkType === 'inreach') {
        const timeAgo = new Date(currentUnixTime - (minAgo)); // daysAgo
        dateFormat.masks.garmin = 'yyyy-mm-dd"T"HH:MM"Z"';
        const garminFormatedDate = dateFormat(timeAgo, 'garmin');
        return `https://us0.inreach.garmin.com/Feed/Share/${trkLink}?d1=${garminFormatedDate}`;
    } else {
        const timeAgo = new Date(currentUnixTime - (minAgo)); // daysAgo
        dateFormat.masks.spot = 'yyyy-mm-dd"T"HH:MM:ss"-0000"';
        const spotFormatedDate = dateFormat(timeAgo, 'spot');
        return `https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/${trkLink}/message.json?startDate=${spotFormatedDate}`;
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

async function createPingsArray(trackers, responses, time) {

    pingsArray = [];

    for (let i = 0; i < trackers.length; i++) {
        if (trackers[i].trkType === 'inreach') {
            let pings = await parseGarminResponse(trackers[i].id, trackers[i].owner_id, responses[i], time);
            if (pings.length !== 0) { pingsArray = pingsArray.concat(pings); }
        } else {
            let pings = await parseSpotResponse(trackers[i].id, trackers[i].owner_id, responses[i], time);
            if (pings.length !== 0) { pingsArray = pingsArray.concat(pings); }
        }
    }
    return pingsArray;
}

async function parseGarminResponse(deviceID, userID, res, time) {
    const parser = new xml2js.Parser();
    const data = await parser.parseStringPromise(res.data);

    if (data === null) {
        console.log(`Tracker: ${deviceID}'s tracking link might not be valid. The response is completely empty.`)
        return [];
    }

    if (data.kml.Document[0].Folder === undefined) {
        console.log(`Garmin tracker ${deviceID} does not have any new data.`)
        return [];
    }

    const d = data.kml.Document[0].Folder[0].Placemark;

    const pingsArray = [];

    for (let i = 0; i < d.length - 1; i++) {

        let unix = Math.floor(new Date(d[i].TimeStamp[0].when[0]).getTime() / 1000);
        let lat = d[i].ExtendedData[0].Data[8].value[0];
        let lng = d[i].ExtendedData[0].Data[9].value[0];
        let alt = (d[i].Point[0].coordinates[0]).split(",")[2];
        let velocity = d[i].ExtendedData[0].Data[11].value[0];
        let heading = d[i].ExtendedData[0].Data[12].value[0];
        let message = d[i].ExtendedData[0].Data[15].value[0];
        let emergency = d[i].ExtendedData[0].Data[14].value[0];

        const ping = {
            unix: unix,
            lat: lat,
            lng: lng,
            alt: alt,
            velocity: velocity,
            heading: heading,
            message: message,
            emergency: emergency,
            deviceID: deviceID,
            userID: userID
        }
        if (ping.unix >= (Math.floor(time / 1000) - (60 * process.env.TIME_SPAN_IN_MINUTES))) {    // If ping was created within the last 20 min
            pingsArray.push(ping);
        }
    }
    return pingsArray;
}

async function parseSpotResponse(deviceID, userID, res, time) {
    if (res.data.response.errors !== undefined) {
        let { error } = res.data.response.errors;
        if (error.text === 'No Messages to display') {
            console.log(`Spot tracker ${deviceID} does not have any new data.`);
            return [];
        } else if (error.text === 'Feed Not Found') {
            console.log(`Spot tracker ${deviceID}'s URL is not working.`);
            return [];
        } else if (error.text === 'Date/Time format is incorrect.') {
            console.log(`Spot tracker ${deviceID} is thowing a Date/Time format error but just ignore it.`)
        }
        else {
            console.log(`Spot tracker ${deviceID} threw an unrecognized error.`, error)
            return [];
        }
    }

    const dataPoints = res.data.response.feedMessageResponse.messages.message;

    const pingsArray = [];

        for (let i = 0; i < dataPoints.length; i++) {

        let { unixTime, latitude, longitude, altitude, messageContent } = dataPoints[i];

        if (messageContent === undefined) {
            messageContent = '';
        }

        ping = {
            unix: unixTime,
            lat: latitude,
            lng: longitude,
            alt: altitude,
            velocity: '',
            heading: '',
            message: messageContent,
            emergency: '',
            deviceID: deviceID,
            userID: userID
        }

        if (ping.unix >= (Math.floor(time / 1000) - (60 * process.env.TIME_SPAN_IN_MINUTES))) {    // If ping was created within the last 20 min
            pingsArray.push(ping);
        }
    }
    return pingsArray;
}

async function createInsertStatement(pingsArray) {
    let insertStatement = 'INSERT IGNORE INTO pings(unixTime, lat, lng, alt, elevation, velocity, heading, txtMsg, isEmergency, tracker_id, user_id) VALUES ';

    for (let p of pingsArray) {
        insertStatement = insertStatement.concat(`(${p.unix}, ${p.lat}, ${p.lng}, ${p.alt}, ${p.elevation}, "${p.velocity}", "${p.heading}", "${p.message}", "${p.emergency}", ${p.deviceID}, ${p.userID}),`);
    }

    insertStatement = insertStatement.slice(0, -1).concat(";");
    return insertStatement;
}

async function getElevationData(pingsArray) {
    // Max 512 locations per request
    try {
        let locations = '';
        for (let ping of pingsArray) {
            locations = locations.concat(`${ping.lat},${ping.lng}|`);
        }
        locations = locations.slice(0, -1);

        const res = await axios.get(`https://maps.googleapis.com/maps/api/elevation/json?locations=${locations}&key=${process.env.ELEVATION_API_KEY}`);
        return res.data.results;

    } catch (e) {
        console.log(e);
    }
}

async function addElevationToPingsArray(pingsArray, elevations) {
    for (let i = 0; i < pingsArray.length; i++) {
        pingsArray[i].elevation = +elevations[i].elevation.toFixed(2);
    }
    return pingsArray;
}

async function saveTrackingData(db, sqlStatement) {
    try {
        const [result] = await db.execute(sqlStatement)
        return result.affectedRows
    } catch (e) {
        throw e
    }
}

start();     // DEV