const GetAllUsers = require('../services/users/getAllUsers');
const GetSingleUser = require('../services/users/getSingleUser');
const DeleteUser = require('../services/users/deleteUser');
const UpdateUser = require('../services/users/updateUser');
const CreateUser = require('../services/users/createUser');
module.exports = {
    async getAllUsers(req, res) {
        try {
            const allUsers = await GetAllUsers.getAllUsers();
            return res.status(200).json({ users: allUsers });
        }
        catch (e) {
            return res.status(500).json({ error: e, message: 'Failed to get all users' });
        }
    },
    async getSingleUser(req, res) {
        try {
            const { id } = req.params;
            const userData = await GetSingleUser.getSingleUser(id);
            res.status(200).json({ user: userData });
        }
        catch (e) {
            res.status(500).json({ error: e, message: `Failed to get user: ${userID}` });
        }
    },
    async deleteUser(req, res) {
        try {   // Users should only be able to delete their own accounts. We need to extract the users id from the JWT.
            const { id } = req.userData;
            await DeleteUser.deleteUser(id);
            res.status(200).json({ message: `user: ${id} was successfully deleted` });

        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to delete user: ${id}` });
        }
    },
    async updateUser(req, res) {
        try {   // Users should only be able to update their own accounts. We need to extract the users id from the JWT.
            const { id } = req.userData;
            const { fName, lName, email, picture } = req.body;
            await UpdateUser.updateUser(fName, lName, email, picture, id);
            res.status(200).json({ message: `user: ${id} was successfully updated` });

        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to update user: ${id}` });
        }
    },
    async createUser(req, res) {
        try {
            const { fName, lName, email, picture } = req.body;
            const userID = await CreateUser.createUser(fName, lName, email, picture, '', '');
            res.status(200).json({ message: `user: ${userID} was successfully created` });
        } catch (e) {
            res.status(500).json({ error: e, message: `Failed to update user` });
        }

    }
}