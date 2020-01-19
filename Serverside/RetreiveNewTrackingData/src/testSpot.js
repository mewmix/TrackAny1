const axios = require('axios');
const dateFormat = require('dateformat');

async function testSpot(deviceID, trkLink, userID) {

    const weekAgo = new Date(Date.now() - 604800000);
    const spotFormatedDate = dateFormat(weekAgo, 'isoDateTime');

    const finalURL = `${trkLink}/message.json?startDate=${spotFormatedDate}`;

    const res = await axios.get(finalURL);

    console.log(finalURL);

    // console.log(res.data);


    if (res.data.response.errors !== undefined) {
        if (res.data.response.errors.error.text === 'No Messages to display') {
            console.log(`Spot tracker ${deviceID} does not have any new data.`)
        } else if (res.data.response.errors.error.text === 'Feed Not Found') {
            console.log(`Spot tracker ${deviceID}'s URL is not working.`)
        } else {
            console.log(`Spot tracker ${deviceID} threw an unrecognized error.`, res.data.response.errors.error)
        }
        return '';
    }

    const dataPoints = res.data.response.feedMessageResponse.messages.message;

    let insertStatement = '';

    for (let p of dataPoints) {
        let message = '';
        if (p.messageContent !== undefined) { message = p.messageContent }
        insertStatement = insertStatement.concat(`(${p.unixTime}, ${p.latitude}, ${p.longitude}, ${p.altitude}, "n/a", "n/a", "${message}", "n/a", ${deviceID}, ${userID}),`);
    }

    console.log(insertStatement)
    return insertStatement;
}

testSpot(4, 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0lOSqK4ZMcY7h6ulQ936SqUeQqSTlNHDa', 4);