exports.createTracker = async function (ownerID, trackerType, trackingLink, trackerName) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [result] = await db.execute('INSERT INTO trackers (owner_id, trkType, trkLink, trkName) VALUES (?, ?, ?, ?);', [ownerID, trackerType, trackingLink, trackerName]);
        return result.insertId;
    } catch (e) {
        throw e;
    }
}