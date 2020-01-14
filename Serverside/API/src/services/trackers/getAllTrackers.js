exports.getAllTrackers = async function () {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT * FROM trackers');
        return rows;
    } catch (e) {
        throw e;
    }
}