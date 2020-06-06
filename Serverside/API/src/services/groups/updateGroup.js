exports.updateGroup = async function (groupName, info, id) {
    try {
        const db = await require('../../db').connectToDatabase();
        await db.execute('UPDATE public_groups SET groupName=?, info=?, WHERE id=?;', [groupName, info, id]);
    } catch (e) {
        throw e;
    }
}