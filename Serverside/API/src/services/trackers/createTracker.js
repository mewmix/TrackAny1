exports.createTracker = async function (ownerID, trackerType, trackingLink, trackerName, trkModel) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [result] = await db.execute('INSERT INTO trackers (owner_id, trkType, trkLink, trkName, trkModel) VALUES (?, ?, ?, ?, ?);', [ownerID, trackerType, trackingLink, trackerName, trkModel]);
        return result.insertId;
    } catch (e) {
        throw e;
    }
}