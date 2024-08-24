import app from "./app";
import config from "./config/config";
import { DBConnection } from "./config/database";

require("dotenv").config();

let server: any;

DBConnection().then(() => {
  console.log("Connected to Database");
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
});