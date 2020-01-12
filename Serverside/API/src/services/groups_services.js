const db = require('../db');

module.exports = {
    getGroupTrackingData(groupID, timeSpan) {
        return new Promise((resolve, reject) => {

            // Need to get current time in seconds and determine how far back we want our tracking data to go
            const currentUnix = Math.floor(Date.now() / 1000);

            let queryTill;

            switch (timeSpan) {
                case 'mostrecent':

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

            // Need to take string called timespan. This will contain things like mostrecent, all, 1hr, 2hr, 8hr, 12hr, 24hr, 48hr, 1week etc...
            // For each of these string we need to get the time in seconds ago these were

            // We can then query the db saying give us all data between then and now

            let members;

            this.getGroupRoster(groupID).then((res) => {
                members = res;
            }).catch((e) => {
                resolve('problem getting group roster', e);
            });

            for (let member of members) {
                consoconsole.log(member);
            }
            
        });
    },
    getGroupRoster(groupID) {
        return Promise((resolve, reject) => {
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