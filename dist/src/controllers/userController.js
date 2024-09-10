"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class UserController {
    constructor() {
        this.addUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, first_name, last_name } = req.body;
                const user = new models_1.User({ email, first_name, last_name });
                yield user.setPassword(password);
                const result = yield user.save();
                res.status(201).json({ message: 'User registered successfully', user: result });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Server Error');
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield models_1.User.findOne({ where: { email } });
                if (!user) {
                    return res.status(401).send('User not exist');
                }
                const isPasswordValid = yield user.validatePassword(password);
                if (!isPasswordValid) {
                    return res.status(401).send('User not exist');
                }
                const token = yield user.generateAuthToken();
                res.status(200).json({ token });
            }
            catch (error) {
                res.status(500).send('Server Error');
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.User.getAllUser();
                res.status(200).json(users);
            }
            catch (error) {
                console.log(error);
                res.status(500).send('server error');
            }
        });
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const isDeleted = yield models_1.User.deleteUserById(parseInt(id));
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
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updatedData = req.body;
                const updatedUser = yield models_1.User.updateUserById(parseInt(id), updatedData);
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
        });
        this.assignRole = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, roleId } = req.body;
                yield models_1.UserRole.create({ user_id: userId, role_id: roleId });
                res.status(200).json({ message: "Role assigned successfully" });
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Server Error");
            }
        });
        this.getUsersWithRoles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const usersWithRoles = yield models_1.User.scope('withRoles').findAll();
                res.status(200).json(usersWithRoles);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Server Error');
            }
        });
        this.getRolesWithPermissions = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const rolesWithPermissions = yield models_1.Role.scope('withPermissions').findAll();
                res.status(200).json(rolesWithPermissions);
            }
            catch (error) {
                console.log(error);
                res.status(500).send("Server Error");
            }
        });
    }
}
const usercontroller = new UserController();
exports.default = usercontroller;
// login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });
//     if (!user || !(await user.validatePassword(password))) {
//       return res.status(401).send('User not exist');
//     }
//     const token = await user.generateAuthToken();
//     res.json({ token });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Server Error');
//   }
// }
//# sourceMappingURL=userController.js.map