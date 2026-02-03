import debug from "debug";
import { createApp } from "./src/app.js";
import config from "./src/config/index.js";

import("./src/config/database.js");

function normalizaPort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;
  return false;
}

const port = normalizaPort(config.appPort);

createApp().then((app) => {
  app.listen(port, () => {
    debug(`app listening on port ${port}`);
  });
});
