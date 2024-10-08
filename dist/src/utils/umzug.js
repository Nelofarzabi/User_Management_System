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
exports.umzug = void 0;
const umzug_1 = require("umzug");
const database_1 = require("../config/database");
const umzug = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return Promise.resolve(new umzug_1.Umzug({
            storage: new umzug_1.SequelizeStorage({ sequelize: database_1.sequelize }),
            migrations: [
                {
                    // the name of the migration is mandatory
                    //after migration this should ne application
                    name: "000015-main-migration-posts-comments-tables",
                    up(_a) {
                        return __awaiter(this, arguments, void 0, function* ({ context }) {
                            // for deleting all contents of database change the force option to true
                            const forceOption = true;
                            console.log("running migrations");
                            yield database_1.sequelize.sync({ force: forceOption });
                        });
                    },
                    down(_a) {
                        return __awaiter(this, arguments, void 0, function* ({ context }) {
                            console.log("down 0000-main-migration-posts-comments-tables");
                        });
                    },
                },
            ],
            context: database_1.sequelize.getQueryInterface(),
            logger: console,
        }));
    }
    catch (err) {
        throw err;
    }
});
exports.umzug = umzug;
//# sourceMappingURL=umzug.js.map