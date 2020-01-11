const db = require('../db');

module.exports = {
    saveAllTrackingData(sqlStatement) {
        return new Promise((resolve, reject) => {
            db.query(sqlStatement, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result.affectedRows);
                }
            });
        });
    },
}