const db = require('../db');

module.exports = {

    initDatabase(req, res) {
        let sqlStatement = `DROP DATABASE IF EXISTS ${process.env.DB_DATABASE}; CREATE DATABASE ${process.env.DB_DATABASE}; USE ${process.env.DB_DATABASE};`;

        db.query(sqlStatement, (err, result) => {
            if (!err) {
                res.status(200).json({
                    message: "database has been dropped & re-initialized"
                });
            } else {
                res.status(400).json({ error: err })
            }
        })
    },

    addTables(req, res) {
        let sqlStatement = `CREATE TABLE users( id INT AUTO_INCREMENT PRIMARY KEY, fName VARCHAR (255), lName VARCHAR (255), email VARCHAR (255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, created TIMESTAMP DEFAULT NOW());`;

        db.query(sqlStatement, (err, result) => {
            if (!err) {
                res.status(200).json({
                    message: "users table has been created"
                });
            } else {
                res.status(400).json({ error: err })
            }
        })
    },

    addMockUsers(req, res) {
        let sqlStatement = `INSERT INTO ${process.env.DB_DATABASE}.users (fName, lName, email, password) VALUES ('Mark', 'Faulkner', 'markfaulk350@gmail.com', 'password');`;
        db.query(sqlStatement, (err, result) => {
            if (!err) {
                res.status(200).json({
                    message: "Mock user data has been added"
                });
            } else {
                res.status(400).json({ error: err })
            }
        })
    }
    
};