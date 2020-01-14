exports.removeFromRoster = async function (groupID, userID) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('DELETE FROM groups_have_members WHERE group_id=? AND member_id=?;', [groupID, userID]);
    } catch (e) {
        throw e;
    }
}