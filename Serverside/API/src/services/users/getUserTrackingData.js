exports.getUserTrackingData = async function (userID, queryTill) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT id, unixTime, lat, lng, alt, agl, velocity, heading, txtMsg, isEmergency FROM pings WHERE user_id=? AND unixTime >=? ORDER BY unixTime DESC;', [userID, queryTill]);
        return rows;
    } catch (e) {
        throw e;
    }
}