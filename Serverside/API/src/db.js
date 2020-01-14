const mysql = require('mysql2/promise');

async function connectToDatabase() {
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
module.exports.connectToDatabase = connectToDatabase;