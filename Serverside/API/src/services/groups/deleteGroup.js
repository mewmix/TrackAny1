exports.deleteGroup = async function (id) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('DELETE FROM public_groups WHERE id=?;', [id]);
    } catch (e) {
        throw e;
    }
}