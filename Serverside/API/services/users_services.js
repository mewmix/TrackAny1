const db = require('../db');

module.exports = {
    getAllUsers() {
        return new Promise((resolve, reject) => {
            let sqlStatement = `SELECT * FROM users;`;
            db.query(sqlStatement, (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows);
                }
            });
        });
    },
    getSingleUser(userID) {
        return new Promise((resolve, reject) => {
            let sqlStatement = `SELECT * FROM users WHERE id=? limit 1;`;
            db.query(sqlStatement, userID, (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows[0]);
                }
            });
        });
    },
    deleteUser(userID) {
        return new Promise((resolve, reject) => {
            let sqlStatement = `DELETE FROM users WHERE id=?;`;
            db.query(sqlStatement, userID, (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result.affectedRows);
                }
            });
        });
    },
    updateUser(userID, fName, lName, email, picture) {
        return new Promise((resolve, reject) => {
            let sqlStatement = `UPDATE users SET fName=?, lName=?, email=?, picture=? WHERE id=?;`;
            db.query(sqlStatement, [fName, lName, email, picture, userID], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result.affectedRows);
                }
            });
        });
    },
    createUser(fName, lName, email, picture, googleID, facebookID) {
        return new Promise((resolve, reject) => {
            let sqlStatement = `INSERT INTO users ( fName, lName, email, picture, googleID, facebookID ) VALUES (?, ?, ?, ?, ?, ?);`;
            db.query(sqlStatement, [fName, lName, email, picture, googleID, facebookID], (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result.insertId);
                }
            });
        });
    },
    findGoogleUser(googleID) {
        return new Promise((resolve, reject) => {
            let sqlStatement = `SELECT id, fName, lName FROM users WHERE googleID=? limit 1;`;
            db.query(sqlStatement, googleID, (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows[0]);
                }
            });
        });
    },
    findFacebookUser(facebookID) {
        return new Promise((resolve, reject) => {
            let sqlStatement = `SELECT id, fName, lName FROM users WHERE facebookID=? limit 1;`;
            db.query(sqlStatement, facebookID, (err, rows) => {
                if (err) reject(err);
                else {
                    resolve(rows[0]);
                }
            });
        });
    }
}