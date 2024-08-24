"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.umzug = void 0;
const umzug_1 = require("umzug");
const database_1 = require("../config/database");
const umzug = async () => {
    try {
        return Promise.resolve(new umzug_1.Umzug({
            storage: new umzug_1.SequelizeStorage({ sequelize: database_1.sequelize }),
            migrations: [
                {
                    // the name of the migration is mandatory
                    //after migration this should ne application
                    name: "000014-main-migration-roles-permissions",
                    async up({ context }) {
                        // for deleting all contents of database change the force option to true
                        const forceOption = true;
                        console.log("running migrations");
                        await database_1.sequelize.sync({ force: forceOption });
                    },
                    async down({ context }) {
                        console.log("down 0000-main-migration-roles-permissions");
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
};
exports.umzug = umzug;
//# sourceMappingURL=umzug.js.map