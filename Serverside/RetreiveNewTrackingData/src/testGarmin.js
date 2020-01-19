const axios = require('axios');
const dateFormat = require('dateformat');
const xml2js = require('xml2js');
const util = require('util'); // For viewing deeply nested xml parsed json objects

async function testGarmin(deviceID, trkLink, userID) {
    const miliSecInDay = 86400 * 1000;
    const daysAgo = new Date(Date.now() - (miliSecInDay * 14));
    dateFormat.masks.garmin = 'yyyy-mm-dd"T"HH:MM"Z"';
    const garminFormatedDate = dateFormat(daysAgo, 'garmin');

    const finalURL = `${trkLink}?d1=${garminFormatedDate}`;
    console.log(finalURL);

    const res = await axios.get(finalURL);

    const parser = new xml2js.Parser();
    const rawData = await parser.parseStringPromise(res.data);
    
    // Need to look at response and see if there is anything before we start parsing data
    if (rawData === null) {
        console.log(`Tracker: ${deviceID}'s tracking link might not be valid. The response is completely empty.`)
        return '';
    }

    if (rawData.kml.Document[0].Folder === undefined) {
        console.log(`Tracker ${deviceID} doesn't seem to have any new data.`)
        return '';
    }
    
    // console.log(util.inspect(rawData, false, null));

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
    console.log(insertStatement);
}

testGarmin(2, 'https://us0.inreach.garmin.com/Feed/Share/bradstevenson', 2);