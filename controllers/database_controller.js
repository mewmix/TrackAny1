module.exports = {

    initDatabase(req, res) {
        res.status(200).json({
            message: "database has been initailized"
        });
    },

    dropDatabase(req, res) {
        res.status(200).json({
            message: "database has been dropped"
        });
    }
};