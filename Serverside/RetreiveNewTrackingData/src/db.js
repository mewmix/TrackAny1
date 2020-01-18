const mysql = require('mysql2/promise');

async function connect() {
    try {
        const connection = await mysql.createConnection(
            {
                multipleStatements: true,
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            }
        );
        return connection;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
module.exports.connect = connect;

// const mysql = require('mysql');

// const db = mysql.createConnection({
//     multipleStatements: true,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE
// });

// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log("Connected to mySQL !!!")
// });

// module.exports = db;