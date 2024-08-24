"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnection = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const umzug_1 = require("../utils/umzug");
const config_1 = __importDefault(require("./config"));
const models_1 = require("../models");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    database: config_1.default.db.database,
    username: config_1.default.db.username,
    password: config_1.default.db.password,
    host: config_1.default.db.host,
    port: 3306,
    define: {
        timestamps: false,
    },
});
const DBConnection = async () => {
    try {
        console.log("Connecting to database...");
        exports.sequelize.addModels(models_1.Models);
        (await (0, umzug_1.umzug)()).up();
        await exports.sequelize.authenticate();
        console.log("DB connection has been established successfully.");
        return Promise.resolve(true);
    }
    catch (err) {
        console.log("Unable to connect to the database:\n", err);
        return Promise.resolve(false);
    }
};
exports.DBConnection = DBConnection;
//# sourceMappingURL=database.js.map