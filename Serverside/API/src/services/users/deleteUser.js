exports.deleteUser = async function (id) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('DELETE FROM users WHERE id=?;', [id]);
    } catch (e) {
        throw e;
    }
}