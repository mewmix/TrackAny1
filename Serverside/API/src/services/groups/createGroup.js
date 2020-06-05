exports.createGroup = async function (creatorID, groupName, info, lat, lng, address, city, county, stateAbbr, state, countryAbbr, country, postal) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [result] = await db.execute('INSERT INTO public_groups (creatorID, groupName, info, lat, lng, address, city, county, stateAbbr, state, countryAbbr, country, postal) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [creatorID, groupName, info, lat, lng, address, city, county, stateAbbr, state, countryAbbr, country, postal]);
        return result.insertId;
    } catch (e) {
        throw e;
    }
}