exports.createUser = async function (fName, lName, email, picture, googleID, facebookID) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [result] = await db.execute('INSERT INTO users ( fName, lName, email, picture, googleID, facebookID ) VALUES (?, ?, ?, ?, ?, ?);', [fName, lName, email, picture, googleID, facebookID]);
        return result.insertId;
    } catch (e) {
        throw e;
    }
}