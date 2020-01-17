exports.unfollowGroup = async function (userID, groupID) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('DELETE FROM follow_groups WHERE follower_id=? AND group_id=?;', [userID, groupID]);
    } catch (e) {
        throw e;
    }
}