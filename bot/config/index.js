import dotenv from "dotenv";
dotenv.config();

const config = {};

config.env = process.env.NODE_ENV || "development";
config.appName = process.env.APP_NAME || "bot-wiki";
config.appPort = process.env.APP_PORT || "9009";

config.proxy = process.env.PROXY || "";
config.saveFiles = process.env.SAVE_FILES || "";

export default config;
