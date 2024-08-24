"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermission = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Role_1 = require("./Role");
const Permission_1 = require("./Permission");
let RolePermission = class RolePermission extends sequelize_typescript_1.Model {
    role_id;
    permission_id;
    role;
    permission;
};
exports.RolePermission = RolePermission;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Role_1.Role),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RolePermission.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Permission_1.Permission),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], RolePermission.prototype, "permission_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Role_1.Role),
    __metadata("design:type", Role_1.Role)
], RolePermission.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Permission_1.Permission),
    __metadata("design:type", Permission_1.Permission)
], RolePermission.prototype, "permission", void 0);
exports.RolePermission = RolePermission = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "role_permissions" })
], RolePermission);
//# sourceMappingURL=RolePermission.js.map