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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const UserRole_1 = require("./UserRole");
const Role_1 = require("./Role");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtUtils_1 = require("../utils/jwtUtils");
let User = User_1 = class User extends sequelize_typescript_1.Model {
    id;
    email;
    password;
    first_name;
    last_name;
    roles;
    async getUserById(id) {
        try {
            return await User_1.findOne({
                where: { id: id },
            });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addUser(user) {
        try {
            return await User_1.create(user);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async getAllUser() {
        try {
            return await User_1.findAll();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async deleteUserById(id) {
        try {
            const user = await User_1.findByPk(id);
            if (user) {
                await user.destroy();
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async updateUserById(id, updatedData) {
        try {
            const user = await User_1.findByPk(id);
            if (user) {
                await user.update(updatedData);
                return user;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async setPassword(password) {
        this.password = await bcryptjs_1.default.hash(password, 10);
    }
    async validatePassword(password) {
        return bcryptjs_1.default.compare(password, this.password);
    }
    async generateAuthToken() {
        return (0, jwtUtils_1.generateToken)(this.id);
    }
};
exports.User = User;
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    (0, sequelize_typescript_1.Unique)(true),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.AllowNull)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "first_name", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "last_name", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => Role_1.Role, () => UserRole_1.UserRole),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
exports.User = User = User_1 = __decorate([
    (0, sequelize_typescript_1.Scopes)(() => ({
        withRoles: {
            include: [
                {
                    model: Role_1.Role,
                    through: { attributes: [] },
                },
            ],
        },
    })),
    (0, sequelize_typescript_1.Table)({ tableName: "user" })
], User);
//# sourceMappingURL=User.js.map