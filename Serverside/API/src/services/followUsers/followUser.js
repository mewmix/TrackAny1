exports.followUser = async function (followerID, followeeID) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [result] = await db.execute('INSERT INTO follow_users (follower_id, followee_id) VALUES (?, ?);', [followerID, followeeID]);
        return result.insertId;
    } catch (e) {
        throw e;
    }
}