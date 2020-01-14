exports.getUsersTrackers = async function (id) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT * FROM trackers WHERE owner_id=?;', [id]);
        return rows;
    } catch (e) {
        throw e;
    }
}