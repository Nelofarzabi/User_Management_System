"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user.routes"));
const post_routes_1 = __importDefault(require("./post.routes"));
const comment_routes_1 = __importDefault(require("./comment.routes"));
const router = express_1.default.Router();
const defaultRoutes = [
    {
        path: "/user",
        route: user_routes_1.default,
    },
    {
        path: "/post",
        route: post_routes_1.default,
    },
    {
        path: "/comment",
        route: comment_routes_1.default,
    }
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
//# sourceMappingURL=index.js.map