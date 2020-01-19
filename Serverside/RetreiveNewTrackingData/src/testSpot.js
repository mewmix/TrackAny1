const axios = require('axios');
const dateFormat = require('dateformat');

async function testSpot(deviceID, trkLink, userID) {

    const weekAgo = new Date(Date.now() - 604800000);
    dateFormat.masks.spot = 'yyyy-mm-dd"T"HH:MM:ss"-0000"';
    const spotFormatedDate = dateFormat(weekAgo, 'spot');

    const finalURL = `${trkLink}/message.json?startDate=${spotFormatedDate}`;

    const res = await axios.get(finalURL);

    console.log(finalURL);

    // console.log(res.data);
    // console.log(res.data.response.errors)


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

    console.log(insertStatement)
    return insertStatement;
}

testSpot(4, 'https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/0lOSqK4ZMcY7h6ulQ936SqUeQqSTlNHDa', 4);