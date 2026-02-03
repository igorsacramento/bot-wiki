import dotenv from "dotenv";
dotenv.config();

const config = {};

config.env = process.env.NODE_ENV || "development";
config.appName = process.env.APP_NAME || "bot-wiki";
config.appPort = process.env.APP_PORT || "9009";

config.DBConnectHost = process.env.DB_CONNECT_HOST || "localhost";
config.DBConnectPort = process.env.DB_CONNECT_PORT || 5432;
config.DBConnectUsername = process.env.DB_CONNECT_USERNAME || "";
config.DBConnectPassword = process.env.DB_CONNECT_PASSWORD || "";
config.DBConnectDatabase = process.env.DB_CONNECT_DATABASE || "";
config.DBConnectDialect = process.env.DB_CONNECT_DIALECT || "postgres";

config.development = {
  DBConnectHost: process.env.DB_CONNECT_HOST_DEV || config.DBConnectHost,
  DBConnectPort: process.env.DB_CONNECT_PORT_DEV || config.DBConnectPort,
  DBConnectUsername:
    process.env.DB_CONNECT_USERNAME_DEV || config.DBConnectUsername,
  DBConnectPassword:
    process.env.DB_CONNECT_PASSWORD_DEV || config.DBConnectPassword,
  DBConnectDatabase:
    process.env.DB_CONNECT_DATABASE_DEV || config.DBConnectDatabase,
  DBConnectDialect:
    process.env.DB_CONNECT_DIALECT_DEV || config.DBConnectDialect,
};
config.production = {
  DBConnectHost: process.env.DB_CONNECT_HOST || config.DBConnectHost,
  DBConnectPort: process.env.DB_CONNECT_PORT || config.DBConnectPort,
  DBConnectUsername:
    process.env.DB_CONNECT_USERNAME || config.DBConnectUsername,
  DBConnectPassword:
    process.env.DB_CONNECT_PASSWORD || config.DBConnectPassword,
  DBConnectDatabase:
    process.env.DB_CONNECT_DATABASE || config.DBConnectDatabase,
  DBConnectDialect: process.env.DB_CONNECT_DIALECT || config.DBConnectDialect,
};
config.staging = {
  DBConnectHost: process.env.DB_CONNECT_HOST_STAGING || config.DBConnectHost,
  DBConnectPort: process.env.DB_CONNECT_PORT_STAGING || config.DBConnectPort,
  DBConnectUsername:
    process.env.DB_CONNECT_USERNAME_STAGING || config.DBConnectUsername,
  DBConnectPassword:
    process.env.DB_CONNECT_PASSWORD_STAGING || config.DBConnectPassword,
  DBConnectDatabase:
    process.env.DB_CONNECT_DATABASE_STAGING || config.DBConnectDatabase,
  DBConnectDialect:
    process.env.DB_CONNECT_DIALECT_STAGING || config.DBConnectDialect,
};

export default config;
