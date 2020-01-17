exports.unfollowUser = async function (followerID, followeeID) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('DELETE FROM follow_users WHERE follower_id=? AND followee_id=?;', [followerID, followeeID]);
    } catch (e) {
        throw e;
    }
}