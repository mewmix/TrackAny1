exports.createGroup = async function (groupName, region, info, creatorID) {
    try {
        const db = await require('../../db').connectToDatabase();
        const [result] = await db.execute('INSERT INTO public_groups (groupName, region, info, creatorID) VALUES (?, ?, ?, ?);', [groupName, region, info, creatorID]);
        return result.insertId;
    } catch (e) {
        throw e;
    }
}