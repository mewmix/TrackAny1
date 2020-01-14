exports.updateTracker = async function (trackerType, trackingLink, trackerName, id) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('UPDATE trackers SET trkType=?, trkLink=?, trkName=?, WHERE id=?;', [trackerType, trackingLink, trackerName, id]);
    } catch (e) {
        throw e;
    }
}