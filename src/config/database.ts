import { Sequelize } from "sequelize-typescript";
import { umzug } from "../utils/umzug";
import config from "./config";
import {Models} from "../models";

export const sequelize = new Sequelize({
    dialect: "mysql",
    database: config.db.database,
    username: config.db.username,
    password: config.db.password,
    host: config.db.host,
    port: 3306,
    define: {
      timestamps: false,
    },
    
});

  export const DBConnection = async () => {
    try {
      console.log("Connecting to database...");
      sequelize.addModels(Models);
      (await umzug()).up();
      await sequelize.authenticate();
      console.log("DB connection has been established successfully.");
      return Promise.resolve(true);
    } catch (err) {
      console.log("Unable to connect to the database:\n", err);
      return Promise.resolve(false);
    }

}