const axios = require('axios');
const dateFormat = require('dateformat');
const xml2js = require('xml2js');
const util = require('util');

async function testGarmin(deviceID, trkLink) {
    const weekAgo = new Date(Date.now() - (604800000 * 2));
    dateFormat.masks.garmin = 'yyyy-mm-dd"T"HH:MM"z"';
    const garminFormatedDate = dateFormat(weekAgo, 'garmin');

    const finalURL = `${trkLink}?d1=${garminFormatedDate}`;
    console.log(finalURL);

    const res = await axios.get(finalURL);

    const parser = new xml2js.Parser();

    const rawData = await parser.parseStringPromise(res.data);
    console.log(util.inspect(rawData.kml.Document[0].Folder[0].Placemark[0], false, null));

    //console.log(res);
}

testGarmin(2, 'https://us0.inreach.garmin.com/Feed/Share/bradstevenson');