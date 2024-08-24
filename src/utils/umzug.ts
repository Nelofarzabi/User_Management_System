import { Umzug, SequelizeStorage } from "umzug";
import { sequelize } from "../config/database";
import { Models } from "../models";

export const umzug = async () => {
    try {
      return Promise.resolve(
        new Umzug({
          storage: new SequelizeStorage({ sequelize: sequelize }),
          migrations: [
            {
              // the name of the migration is mandatory
              //after migration this should ne application
              name: "000014-main-migration-roles-permissions",
              async up({ context }) {
                // for deleting all contents of database change the force option to true
                const forceOption = true;
                console.log("running migrations");
                await sequelize.sync({force: forceOption});
                
              },
              async down({ context }) {
                console.log("down 0000-main-migration-roles-permissions");
              },
            },
          ],
          context: sequelize.getQueryInterface(),
          logger: console,
        })
      );
    } catch (err) {
      throw err;
    }
  };