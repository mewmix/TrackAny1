const db = require('../db');

module.exports = {
    getGroupTrackingData(groupID, timeSpan) {
        return new Promise((resolve, reject) => {

            const currentUnix = Math.floor(Date.now() / 1000);

            let queryTill;

            switch (timeSpan) {
                case 'mostrecent':
                    console.log("Need to get most recent")
                    break;
                case '1hr':
                    queryTill = currentUnix - 3600;
                    break;
                case '2hr':
                    queryTill = currentUnix - 7200;
                    break;
                case '6hr':
                    queryTill = currentUnix - 21600;
                    break;
                case '12hr':
                    queryTill = currentUnix - 43200;
                    break;
                case '24hr':
                    queryTill = currentUnix - 86400;
                    break;
                case '48hr':
                    queryTill = currentUnix - 172800;
                    break;
                case '1week':
                    queryTill = currentUnix - 604800;
                    break;
                case '2weeks':
                    queryTill = currentUnix - 1209600;
                    break;
                case 'all':
                    queryTill = 1;
                    break;
                default:
                    reject(new Error('did not specify time span for group tracking data'));
            }

            let sqlStatement = 'SELECT users.id, fName, lName, picture FROM groups_have_members INNER JOIN users ON groups_have_members.member_id = users.id WHERE groups_have_members.group_id=?;';

            db.query(sqlStatement, groupID, (err, groupMembers) => {
                if (err) reject(err);
                else {
                    let groupTrackingData = []
                    for(let member of groupMembers){
                        let sqlStatement = 'SELECT id, unixTime, lat, lng, alt, agl, velocity, heading, txtMsg, isEmergency FROM pings WHERE user_id=? AND unixTime >=? ORDER BY unixTime DESC;';
                        db.query(sqlStatement, [member.id, queryTill], (err, rows) => {
                            if (err) reject(err);
                            else {
                            }
                        });
                    }
                    
                }
            });
        });
    },
    // getGroupRoster(groupID) {
    //     return Promise((resolve, reject) => {
    //         let sqlStatement = 'SELECT users.id, fName, lName, picture FROM groups_have_members INNER JOIN users ON groups_have_members.member_id = users.id WHERE groups_have_members.group_id=?;';
    //         db.query(sqlStatement, groupID, (err, rows) => {
    //             if (err) reject(err);
    //             else {
    //                 resolve(rows);
    //             }
    //         });
    //     });
    // }
}