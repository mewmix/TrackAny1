exports.deleteTracker = async function (id) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('DELETE FROM trackers WHERE id=?;', [id]);
    } catch (e) {
        throw e;
    }
}