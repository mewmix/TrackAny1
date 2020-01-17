exports.getUsersFollowedGroups = async function (userID) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute('SELECT public_groups.id, groupName, region FROM public_groups INNER JOIN follow_groups ON public_groups.id = follow_groups.group_id WHERE follow_groups.follower_id=?;', [userID]);
        return rows;
    } catch (e) {
        throw e;
    }
}