async function createSpotInsertStatement(deviceID, userID, res) {

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
    return insertStatement;
}

module.exports.createSpotInsertStatement = createSpotInsertStatement;