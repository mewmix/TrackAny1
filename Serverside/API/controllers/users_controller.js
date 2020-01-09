const UsersServices = require('../services/users_services');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const allUsers = await UsersServices.getAllUsers();
            return res.status(200).json({ users: allUsers });
        }
        catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to get all users' });
        }
    },
    async getSingleUser(req, res) {
        try {
            const { id } = req.params;
            const userData = await UsersServices.getSingleUser(id);
            res.status(200).json({ user: userData });
        }
        catch (e) {
            res.status(500).json({ error: e, message: `Failed to get user: ${userID}` });
        }
    },
    async deleteUser(req, res) {
        try {   // Users should only be able to delete their own accounts. We need to extract the users id from the JWT.
            const { id } = req.userData;
            await UsersServices.deleteUser(id);
            res.status(200).json({ message: `user: ${id} was successfully deleted` });

        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to delete user: ${id}` });
        }
    },
    async updateUser(req, res) {
        try {   // Users should only be able to update their own accounts. We need to extract the users id from the JWT.
            const { id } = req.userData;
            const { fName, lName, email, picture } = req.body;
            await UsersServices.updateUser(id, fName, lName, email, picture);
            res.status(200).json({ message: `user: ${id} was successfully updated` });

        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to update user: ${id}` });
        }
    },
}