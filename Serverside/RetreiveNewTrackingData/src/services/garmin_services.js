const axios = require('axios');
const dateFormat = require('dateformat');

async function getTrackingData(deviceID, trkLink) {
    const weekAgo = new Date(Date.now() - 604800000);
    dateFormat.masks.customgarmin = 'HH:MM! "Can\'t touch this!"';
    const garminFormatedDate = dateFormat(weekAgo, 'customgarmin');

    const finalURL = `${trkLink}?d1=${garminFormatedDate}`;

    const res = await axios.get(finalURL);
}

module.exports.getTrackingData = getTrackingData;