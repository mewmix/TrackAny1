exports.addToRoster = async function (groupID, userID) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [result] = await db.execute('INSERT INTO groups_have_members(group_id, member_id) VALUES (?, ?);', [groupID, userID]);
        return result.insertId;
    } catch (e) {
        throw e;
    }
}