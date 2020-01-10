const axios = require('axios');
const dateFormat = require('dateformat');


async function getTrackingData(deviceID, trkLink) {
    const weekAgo = new Date(Date.now() - 604800000);
    const spotFormatedDate = dateFormat(weekAgo, 'isoDateTime');

    const finalURL = `${trkLink}/message.json?startDate=${spotFormatedDate}`;

    const res = await axios.get(finalURL);

    const dataPoints = res.data.response.feedMessageResponse.messages.message;

    let insertStatement = '';

    for (let p of dataPoints) {
        let message = '';
        if (p.messageContent !== undefined) { message = p.messageContent }
        insertStatement = insertStatement.concat(`(${p.unixTime}, ${p.latitude}, ${p.longitude}, ${p.altitude}, "n/a", "n/a", "${message}", "n/a", ${deviceID}),`);
    }

    return insertStatement;
}

module.exports.getTrackingData = getTrackingData;