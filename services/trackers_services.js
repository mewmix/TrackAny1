const db = require('../db');

module.exports = {
    createTracker(ownerID, trackerType, trackingLink, trackerName) {
        return new Promise((resolve, reject) => {
            let sqlStatement = 'INSERT INTO trackers (owner_id, trkType, trkLink, trkName) VALUES (?, ?, ?, ?);';
            db.query(sqlStatement, [ownerID, trackerType, trackingLink, trackerName], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result.insertId);
                }
            });
        });
    },
    updateTracker(id, trackerType, trackingLink, trackerName) {
        return new Promise((resolve, reject) => {
            let sqlStatement = 'UPDATE trackers SET trkType=?, trkLink=?, trkName=?, WHERE id=?';
            db.query(sqlStatement, [trackerType, trackingLink, trackerName, id], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result.affectedRows);
                }
            });
        });
    },
    deleteTracker(id) {
        return new Promise((resolve, reject) => {
            let sqlStatement = 'DELETE FROM trackers WHERE id=?;';
            db.query(sqlStatement, id, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result.affectedRows);
                }
            });
        });
    },
    getSingleTracker(id) {
        return new Promise((resolve, reject) => {
            let sqlStatement = 'SELECT * FROM trackers WHERE id=? limit 1;';
            db.query(sqlStatement, id, (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows[0]);
                }
            });
        });
    },
    getUsersTrackers(ownerID) {
        return new Promise((resolve, reject) => {
            let sqlStatement = 'SELECT * FROM trackers WHERE owner_id=?;';
            db.query(sqlStatement, ownerID, (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows);
                }
            });
        });
    },
    getAllTrackers() {
        return new Promise((resolve, reject) => {
            let sqlStatement = 'SELECT * FROM trackers;';
            db.query(sqlStatement, (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows);
                }
            });
        });
    },

}