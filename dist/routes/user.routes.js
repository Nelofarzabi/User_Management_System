"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = __importDefault(require("../middlewares/validate"));
const validations_1 = require("../validations");
const controllers_1 = require("../controllers");
const userController_1 = __importDefault(require("../controllers/userController"));
const router = express_1.default.Router();
router.post('/add-user', userController_1.default.addUser);
router.post('/login', userController_1.default.login);
router.get('/get-user', userController_1.default.getUser);
router.delete("/delete/:id", userController_1.default.deleteUser);
router.put("/update/:id", (0, validate_1.default)(validations_1.userValidations.updateUser), userController_1.default.updateUser);
router.post("/assign-role", controllers_1.userController.assignRole);
router.get('/users-with-roles', controllers_1.userController.getUsersWithRoles);
router.get('/roles-with-permissions', userController_1.default.getRolesWithPermissions);
exports.default = router;
//router.post('/add-user' , validate(userValidations.addUser), userController.addUser);
//# sourceMappingURL=user.routes.js.map