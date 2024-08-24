"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config/config"));
const database_1 = require("./config/database");
require("dotenv").config();
let server;
(0, database_1.DBConnection)().then(() => {
    console.log("Connected to Database");
    server = app_1.default.listen(config_1.default.port, () => {
        console.log(`Listening to port ${config_1.default.port}`);
    });
});
//# sourceMappingURL=index.js.map