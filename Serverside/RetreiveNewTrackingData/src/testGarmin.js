const axios = require('axios');
const dateFormat = require('dateformat');
const xml2js = require('xml2js');
const util = require('util'); // For viewing deeply nested xml parsed json objects

async function testGarmin(deviceID, trkLink, userID) {
    const miliSecInDay = 86400 * 1000;
    const daysAgo = new Date(Date.now() - (miliSecInDay * 7));
    // const daysAgo = new Date(Date.now() - (1000 * 60 * 20));
    dateFormat.masks.garmin = 'yyyy-mm-dd"T"HH:MM"Z"';
    const garminFormatedDate = dateFormat(daysAgo, 'garmin');

    const finalURL = `https://us0.inreach.garmin.com/Feed/Share/${trkLink}?d1=${garminFormatedDate}`;
    console.log(finalURL);

    const res = await axios.get(finalURL);

    // console.log(res.data)

    const parser = new xml2js.Parser();
    const data = await parser.parseStringPromise(res.data);

    console.log(data)

    if (data === null) {
        console.log(`Tracker: ${deviceID}'s tracking link might not be valid. The response is completely empty.`)
        return '';
    }

    if (data.kml.Document[0].Folder === undefined) {
        console.log(`Garmin tracker ${deviceID} does not have any new data.`)
        return '';
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

        pingsArray.push(ping);
    }
    console.log(pingsArray)
    return pingsArray;
}

testGarmin(1, 'markfaulk', 1);