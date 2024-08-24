"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("./config/config"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = config_1.default.port || 3000;
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
app.set('views', path_1.default.join(__dirname, 'views'));
// enable cors
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.use('/api/v1', routes_1.default);
app.use((req, res, next) => {
    next(new Error("Route Not found"));
});
exports.default = app;
//# sourceMappingURL=app.js.map