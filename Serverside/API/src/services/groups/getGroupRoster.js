exports.getGroupRoster = async function (groupID) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT users.id, fName, lName, picture FROM groups_have_members INNER JOIN users ON groups_have_members.member_id = users.id WHERE groups_have_members.group_id=?;', [groupID]);
        return rows;
    } catch (e) {
        throw e;
    }
}