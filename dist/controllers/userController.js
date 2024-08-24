"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class UserController {
    addUser = async (req, res) => {
        try {
            const { email, password, first_name, last_name } = req.body;
            const user = new models_1.User({ email, first_name, last_name });
            await user.setPassword(password);
            const result = await user.save();
            res.status(201).json({ message: 'User registered successfully', user: result });
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    };
    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await models_1.User.findOne({ where: { email } });
            if (!user || !(await user.validatePassword(password))) {
                return res.status(401).send('User not exist');
            }
            const token = await user.generateAuthToken();
            res.json({ token });
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    };
    getUser = async (req, res) => {
        try {
            const users = await models_1.User.getAllUser();
            res.status(200).json(users);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('server error');
        }
    };
    deleteUser = async (req, res) => {
        try {
            const { id } = req.params;
            const isDeleted = await models_1.User.deleteUserById(parseInt(id));
            if (isDeleted) {
                res.status(200).json({ message: "User deleted successfully" });
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
        }
    };
    updateUser = async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            const updatedUser = await models_1.User.updateUserById(parseInt(id), updatedData);
            if (updatedUser) {
                res.status(200).json({ message: "User updated successfully", user: updatedUser });
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
        }
    };
    assignRole = async (req, res) => {
        try {
            const { userId, roleId } = req.body;
            await models_1.UserRole.create({ user_id: userId, role_id: roleId });
            res.status(200).json({ message: "Role assigned successfully" });
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
        }
    };
    getUsersWithRoles = async (req, res) => {
        try {
            const usersWithRoles = await models_1.User.scope('withRoles').findAll();
            res.status(200).json(usersWithRoles);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Server Error');
        }
    };
    getRolesWithPermissions = async (req, res) => {
        try {
            const rolesWithPermissions = await models_1.Role.scope('withPermissions').findAll();
            res.status(200).json(rolesWithPermissions);
        }
        catch (error) {
            console.log(error);
            res.status(500).send("Server Error");
        }
    };
}
const usercontroller = new UserController();
exports.default = usercontroller;
// addUser = async (req: Request, res: Response) => {
//   try {
//     const body = req.body as ICreateUser;
//     console.log("controller", body);  
//     const user = new User();
//     const result = await user.addUser(body);
//     res.status(201).json(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server Error");
//   }
// }
//# sourceMappingURL=userController.js.map