// exports.getGroupTrackingData = async function (groupID, queryTill) {
//     try {
//         const db = await require('../../db').connectToDatabase();
//         const [groupMembers] = await db.execute('SELECT users.id, fName, lName, picture FROM groups_have_members INNER JOIN users ON groups_have_members.member_id = users.id WHERE groups_have_members.group_id=?;', [groupID]);

//         let groupTrackingData = [];

//         for (let member of groupMembers) {

//                 let [userTrackingData] = await db.execute('SELECT id, unixTime, lat, lng, alt, agl, velocity, heading, txtMsg, isEmergency FROM pings WHERE user_id=? AND unixTime >=? ORDER BY unixTime DESC;', [member.id, queryTill]);

//                 let user = {
//                     id: member.id,
//                     fName: member.fName,
//                     lName: member.lName,
//                     picture: member.picture,
//                     userTrackingData
//                 }

//                 groupTrackingData.push(user);
//         }
//         return groupTrackingData;

//     } catch (e) {
//         throw e;
//     }
// }


exports.getGroupTrackingData = async function (groupID, queryTill) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [groupMembers] = await db.execute('SELECT users.id, fName, lName, picture FROM groups_have_members INNER JOIN users ON groups_have_members.member_id = users.id WHERE groups_have_members.group_id=?;', [groupID]);

        let promises = [];

        for (let i = 0; i < groupMembers.length; i++) {
            promises[i] = db.execute('SELECT id, unixTime, lat, lng, alt, agl, velocity, heading, txtMsg, isEmergency FROM pings WHERE user_id=? AND unixTime >=? ORDER BY unixTime DESC;', [groupMembers[i].id, queryTill]);
        }

        const result = await Promise.all(promises);

        let groupTrackingData = [];

        for (let i = 0; i < groupMembers.length; i++) {
            let user = {
                id: groupMembers[i].id,
                fName: groupMembers[i].fName,
                lName: groupMembers[i].lName,
                picture: groupMembers[i].picture,
                userTrackingData : result[i][0]
            }
            groupTrackingData.push(user);
        }

        return groupTrackingData;

    } catch (e) {
        throw e;
    }
}