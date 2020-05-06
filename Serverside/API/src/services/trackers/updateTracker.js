exports.updateTracker = async function (id, trackerType, trackingLink, trackerName, trackerModel) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('UPDATE trackers SET trkType=?, trkLink=?, trkName=?, trkModel=?, WHERE id=?;', [trackerType, trackingLink, trackerName, trackerModel, id]);
    } catch (e) {
        throw e;
    }
}