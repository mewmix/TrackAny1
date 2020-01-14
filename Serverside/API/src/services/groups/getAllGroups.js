exports.getAllGroups = async function () {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT * FROM public_groups');
        return rows;
    } catch (e) {
        throw e;
    }
}