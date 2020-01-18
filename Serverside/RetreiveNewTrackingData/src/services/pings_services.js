exports.saveAllTrackingData = async function(db, sqlStatement) {
    try {
        const [result] = await db.execute(sqlStatement)
        return result.affectedRows
    } catch (e) {
        throw e
    }
}
