const db = require('../db');

module.exports = {
    getUserTrackingData(userID, queryTill) {
        return new Promise((resolve, reject) => {
            let sqlStatement = 'SELECT id, unixTime, lat, lng, alt, agl, velocity, heading, txtMsg, isEmergency FROM pings WHERE user_id=? AND unixTime >=? ORDER BY unixTime DESC;';
            db.query(sqlStatement, [userID, queryTill], (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows);
                }
            });
        });
    },
    getGroupRoster(groupID) {
        return new Promise((resolve, reject) => {
            let sqlStatement = 'SELECT users.id, fName, lName, picture FROM groups_have_members INNER JOIN users ON groups_have_members.member_id = users.id WHERE groups_have_members.group_id=?;';
            db.query(sqlStatement, groupID, (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows);
                }
            });
        });
    }
}