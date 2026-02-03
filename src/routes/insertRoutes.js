import debug from "debug";
import express from "express";
import fs from "fs";

const debugLog = debug("insertRoutes:dev");
const app = express();

import listRoutes from "../data/listRoutes.json" assert { type: "json" };

debugLog("Buscando Routes");
console.log(listRoutes);

const setupRoutes = async (app) => {
  for (const { route, routeName, controller, authMiddleware } of listRoutes) {
    debugLog(
      `Name: ${routeName} | Route: ${route} | Controller: ${controller}`,
    );
    const router = express.Router();

    if (!fs.existsSync(`./src/controllers/${controller}.js`)) {
      debugLog("Error:", `Controller ${controller} não encontrado!`);
      continue;
    }

    const filePath = `../controllers/${controller}.js`;
    const controllersModule = await import(filePath);
    const controllers = controllersModule.default;

    if (authMiddleware) {
      // const AuthMiddleware = require('../middlewares/auth');
      // router.use(AuthMiddleware);
    }

    controllers.forEach(({ active, method, path, func }) => {
      if (active) {
        const lowerCaseMethod = method.toLowerCase();
        if (lowerCaseMethod === "get") {
          router.get(path, func);
        } else if (lowerCaseMethod === "post" || lowerCaseMethod === "insert") {
          router.post(path, func);
        } else if (
          lowerCaseMethod === "delete" ||
          lowerCaseMethod === "remove"
        ) {
          router.delete(path, func);
        } else if (lowerCaseMethod === "put" || lowerCaseMethod === "update") {
          router.put(path, func);
        }
      }
    });

    app.use(route, router);
  }
};

export default setupRoutes;
