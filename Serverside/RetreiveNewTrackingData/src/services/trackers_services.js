const db = require('../db');

module.exports = {
    getAllTrackers() {
        return new Promise((resolve, reject) => {
            let sqlStatement = 'SELECT id, trkType, trkLink FROM trackers;';
            db.query(sqlStatement, (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows);
                }
            });
        });
    },
}
