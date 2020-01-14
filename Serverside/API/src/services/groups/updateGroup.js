exports.updateGroup = async function (groupName, region, info, id) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('UPDATE public_groups SET groupName=?, region=?, info=?, WHERE id=?;', [groupName, region, info, id]);
    } catch (e) {
        throw e;
    }
}