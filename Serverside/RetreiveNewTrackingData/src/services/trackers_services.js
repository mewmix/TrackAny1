exports.getAllTrackers = async function (db) {
    try {
        const [rows] = await db.execute('SELECT id, trkType, trkLink, owner_id FROM trackers;')
        return rows
    } catch (e) {
        throw e
    }
}