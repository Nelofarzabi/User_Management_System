import { Umzug, SequelizeStorage } from "umzug";
import { sequelize } from "../config/database";

export const umzug = async () => {
    try {
      return Promise.resolve(
        new Umzug({
          storage: new SequelizeStorage({ sequelize: sequelize }),
          migrations: [
            {
              // the name of the migration is mandatory
              //after migration this should ne application
              name: "000015-main-migration-posts-comments-tables",
              async up({ context }) {
                // for deleting all contents of database change the force option to true
                const forceOption = true;
                console.log("running migrations");
                await sequelize.sync({force: forceOption});
                
              },
              async down({ context }) {
                console.log("down 0000-main-migration-posts-comments-tables");
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