exports.followGroup = async function (userID, groupID) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [result] = await db.execute('INSERT INTO follow_groups (follower_id, group_id) VALUES (?, ?);', [userID, groupID]);
        return result.insertId;
    } catch (e) {
        throw e;
    }
}