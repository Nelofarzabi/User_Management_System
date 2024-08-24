"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Models = exports.UserRole = exports.RolePermission = exports.Permission = exports.Role = exports.User = void 0;
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Role_1 = require("./Role");
Object.defineProperty(exports, "Role", { enumerable: true, get: function () { return Role_1.Role; } });
const Permission_1 = require("./Permission");
Object.defineProperty(exports, "Permission", { enumerable: true, get: function () { return Permission_1.Permission; } });
const RolePermission_1 = require("./RolePermission");
Object.defineProperty(exports, "RolePermission", { enumerable: true, get: function () { return RolePermission_1.RolePermission; } });
const UserRole_1 = require("./UserRole");
Object.defineProperty(exports, "UserRole", { enumerable: true, get: function () { return UserRole_1.UserRole; } });
exports.Models = [
    User_1.User,
    Role_1.Role,
    Permission_1.Permission,
    RolePermission_1.RolePermission,
    UserRole_1.UserRole,
];
//# sourceMappingURL=index.js.map