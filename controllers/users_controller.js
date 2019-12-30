const db = require('../db');

module.exports = {
    getAllUsers(req, res) {
        let sqlStatement = `SELECT * FROM users;`;

        db.query(sqlStatement, (err, result) => {
            if (!err) {
                res.status(200).json({
                    users: result
                });
            } else {
                res.status(400).json({ error: err })
            }
        })
    }
}