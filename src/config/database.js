import config from "./index.js";

const { development, production, staging } = config;

const configDB = {
  development: {
    username: development.DBConnectUsername,
    password: development.DBConnectPassword,
    database: development.DBConnectDatabase,
    host: development.DBConnectHost,
    port: development.DBConnectPort,
    dialect: development.DBConnectDialect,
    define: {
      timestamps: true,
      underscored: false,
    },
  },
  staging: {
    username: staging.DBConnectUsername,
    password: staging.DBConnectPassword,
    database: staging.DBConnectDatabase,
    host: staging.DBConnectHost,
    port: staging.DBConnectPort,
    dialect: staging.DBConnectDialect,
    define: {
      timestamps: true,
      underscored: false,
    },
  },
  production: {
    username: production.DBConnectUsername,
    password: production.DBConnectPassword,
    database: production.DBConnectDatabase,
    host: production.DBConnectHost,
    port: production.DBConnectPort,
    dialect: production.DBConnectDialect,
    define: {
      timestamps: true,
      underscored: false,
    },
  },
};

export default configDB;
