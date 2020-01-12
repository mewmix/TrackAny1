// This file, app v2 will make requests in parallel for tracking data to reduce the amount of the the Lambda function runs.


require('dotenv').config();

const TrackersServices = require('./services/trackers_services');
const PingsServices = require('./services/pings_services');

const axios = require('axios');
const dateFormat = require('dateformat');
const xml2js = require('xml2js');

async function start() {
    const t0 = Date.now();

    const allTrackers = await TrackersServices.getAllTrackers();

    let promises = [];

    for (let i = 0; i < allTrackers.length; i++) {
        promises[i] = axios.get(formatFinalUrl(allTrackers[i].trkType, allTrackers[i].trkLink, t0));
    }

    const results = await Promise.all(promises);
    const t1 = Date.now()
    console.log(`http requests for all trackers took ${t1 - t0} miliseconds`)

    let insertStatement = 'INSERT IGNORE INTO pings(unixTime, lat, lng, alt, velocity, heading, txtMsg, isEmergency, tracker_id, user_id) VALUES ';

    for (let i = 0; i < allTrackers.length; i++) {
        if (allTrackers[i].trkType === 'inreach') {
            let string = await createGarminInsertStatement(allTrackers[i].id, allTrackers[i].owner_id, results[i]);
            insertStatement = insertStatement.concat(string);
        } else {
            let string = await createSpotInsertStatement(allTrackers[i].id, allTrackers[i].owner_id, results[i]);
            insertStatement = insertStatement.concat(string);
        }
    }

    insertStatement = insertStatement.slice(0, -1).concat(";");
    const t2 = Date.now()
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
        const spotFormatedDate = dateFormat(timeAgo, 'isoDateTime');
        return `${trkLink}/message.json?startDate=${spotFormatedDate}`;
    }
}

async function createGarminInsertStatement(deviceID, userID, result) {
    const parser = new xml2js.Parser();
    const rawData = await parser.parseStringPromise(result.data);
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

async function createSpotInsertStatement(deviceID, userID, result) {
    const dataPoints = result.data.response.feedMessageResponse.messages.message;

    let insertStatement = '';

    for (let p of dataPoints) {
        let message = '';
        if (p.messageContent !== undefined) { message = p.messageContent }
        insertStatement = insertStatement.concat(`(${p.unixTime}, ${p.latitude}, ${p.longitude}, ${p.altitude}, "n/a", "n/a", "${message}", "n/a", ${deviceID}, ${userID}),`);
    }
    return insertStatement;
}

start();