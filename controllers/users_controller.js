const UsersServices = require('../services/users_services');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const allUsers = await UsersServices.getAllUsers();
            return res.status(200).json({ users: allUsers });
        }
        catch (e) {
            return res.status(400).json({ error: e, message: "Failed to get all users" });
        }
    },
    async getSingleUser(req, res) {
        const userID = req.params.id;
        try {
            const userData = await UsersServices.getSingleUser(userID);
            res.status(200).json({ user: userData });
        }
        catch (e) {
            res.status(400).json({ error: e, message: `Failed to get user: ${userID}` });
        }
    },
}