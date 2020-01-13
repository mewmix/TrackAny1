async function createSpotInsertStatement(deviceID, userID, result) {
    const dataPoints = result.data.response.feedMessageResponse.messages.message;

    let insertStatement = '';

    for (let p of dataPoints) {
        let message = '';
        if (p.messageContent !== undefined) { message = p.messageContent }
        insertStatement = insertStatement.concat(`(${p.unixTime}, ${p.latitude}, ${p.longitude}, ${p.altitude}, "n/a", "n/a", "${message}", "n/a", ${deviceID}, ${userID}),`);
    }
    return insertStatement;
}

module.exports.createSpotInsertStatement = createSpotInsertStatement;