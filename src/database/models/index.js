import { DataTypes, Sequelize } from "sequelize";
import config from "../../config/index.js";
import requestsModel from "./requests.js";

// Inicializa o Sequelize com as configurações do seu projeto
const sequelize = new Sequelize(
  config.DBConnectDatabase,
  config.DBConnectUsername,
  config.DBConnectPassword,
  {
    host: config.DBConnectHost,
    dialect: config.DBConnectDialect,
    port: config.DBConnectPort,
    logging: false,
  },
);

// Instancia o modelo Requests
const Requests = requestsModel(sequelize, DataTypes);

// Exporte os modelos instanciados
export { Requests, sequelize };
