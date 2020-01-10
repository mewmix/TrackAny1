const axios = require('axios');

// This needs to return a string containing sql insert statements.
async function getTrackingData(deviceID, trkLink) {
    const data = await axios.get(trkLink);
}

module.exports.getTrackingData = getTrackingData;