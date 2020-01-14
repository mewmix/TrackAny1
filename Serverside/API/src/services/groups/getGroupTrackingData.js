exports.getGroupTrackingData = async function (groupID, queryTill) {
    try {
        const db = await require('../../db').connectToDatabase();

        const [groupMembers] = await db.execute('SELECT users.id, fName, lName, picture FROM groups_have_members INNER JOIN users ON groups_have_members.member_id = users.id WHERE groups_have_members.group_id=?;', [groupID]);

        let groupTrackingData = [];

        for (let member of groupMembers) {
            const trackingData = await db.execute('SELECT id, unixTime, lat, lng, alt, agl, velocity, heading, txtMsg, isEmergency FROM pings WHERE user_id=? AND unixTime >=? ORDER BY unixTime DESC;', [userID, queryTill]);

            let user = {
                id: member.id,
                fName: member.fName,
                lName: member.lName,
                picture: member.picture,
                trackingData
            }

            groupTrackingData.push(user);
        }
        return groupTrackingData;

    } catch (e) {
        throw e;
    }
}
