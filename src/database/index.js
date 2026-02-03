import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import dbConfig from "../config/database.js";

const basename = path.basename(import.meta.url);
const env = process.env.NODE_ENV || "development";

const connection = new Sequelize(dbConfig[env]);
const dbConfig = import("../config/database")[env];

const data = fs
  .readdirSync(`${__dirname}/models`)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1,
  );

data.forEach((file) => {
  const model = import(`./models/${file}`);
  model.init(connection);
});

data.forEach((file) => {
  const model = import(`./models/${file}`);
  if (model.associate) model.associate(connection.models);
});

module.exports = connection;
