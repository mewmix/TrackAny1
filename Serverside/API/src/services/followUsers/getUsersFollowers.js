exports.getUsersFollowers = async function (userID) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT users.id, fName, lName, picture FROM users INNER JOIN follow_users ON users.id = follow_users.follower_id WHERE follow_users.followee_id=?;', [userID]);
        return rows;
    } catch (e) {
        throw e;
    }
}