exports.getGroupMember = async function (groupID, userID) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT * FROM groups_have_members WHERE group_id = ? AND member_id = ?;', [groupID, userID]);
        return rows[0];
    } catch (e) {
        throw e;
    }
}