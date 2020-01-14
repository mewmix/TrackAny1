exports.getSingleTracker = async function (id) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT * FROM trackers WHERE id=? limit 1;', [id]);
        return rows[0];
    } catch (e) {
        throw e;
    }
}