exports.getAllUsers = async function () {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT * FROM users');
        return rows;
    } catch (e) {
        throw e;
    }
}