exports.updateUser = async function (fName, lName, email, picture, id) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('UPDATE users SET fName=?, lName=?, email=?, picture=? WHERE id=?;', [fName, lName, email, picture, id]);
    } catch (e) {
        throw e;
    }
}