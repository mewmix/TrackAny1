const axios = require('axios');
const dateFormat = require('dateformat');

async function testSpot(deviceID, trkLink, userID) {

    const weekAgo = new Date(Date.now() - 604800000);
    dateFormat.masks.spot = 'yyyy-mm-dd"T"HH:MM:ss"-0000"';
    const spotFormatedDate = dateFormat(weekAgo, 'spot');

    const finalURL = `https://api.findmespot.com/spot-main-web/consumer/rest-api/2.0/public/feed/${trkLink}/message.json?startDate=${spotFormatedDate}`;

    const res = await axios.get(finalURL);

    console.log(finalURL);

    // console.log(res.data);
    // console.log(res.data.response.errors)


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

    for (let point of dataPoints) {

        let { unixTime, latitude, longitude, altitude, messageContent } = point;

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
        pingsArray.push(ping);
    }
    console.log(pingsArray)
    return pingsArray;
}

testSpot(4, '0lOSqK4ZMcY7h6ulQ936SqUeQqSTlNHDa', 4);