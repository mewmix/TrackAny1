exports.getGroupsFollowers = async function (groupID) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT users.id, fName, lName, picture FROM users INNER JOIN follow_groups ON users.id = follow_groups.follower_id WHERE follow_groups.group_id=?;', [groupID]);
        return rows;
    } catch (e) {
        throw e;
    }
}