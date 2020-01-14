exports.findOauthUser = async function (id, provider) {
    try {
        let idType = '';
        
        if (provider === 'facebook') {
            idType = 'facebookID'
        } else {
            idType = 'googleID'
        }

        const db = await require('../../db').connectToDatabase();
        const [rows] = await db.execute(`SELECT id, fName, lName FROM users WHERE ${idType}=? limit 1;`, [id]);
        return rows[0];
    } catch (e) {
        throw e;
    }
}