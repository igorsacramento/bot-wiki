import debug from "debug";
import fs from "fs";
import config from "../config/index.js";
import { PageLoadError } from "../libs/Errors.js";

import CrawlerInit from "./CrawlerInit.js";

const { saveFiles } = config;

class CrawlerFunctions extends CrawlerInit {
  constructor(options = {}) {
    super(options);
    this.debugLog = debug("CrawlerFunctions:dev");
  }

  returnElement(elements, required = false) {
    this.debugLog("returnElement");
    this.debugLog(
      `Entrou na checagem de elementos na página - obrigatório?: ${required}.`,
    );
    // console.log(elements);
    const { $ } = this;
    const foundElements = [];

    elements.forEach((element) => {
      if ($(element).length) foundElements.push(element);
    });
    if (foundElements.length) {
      this.debugLog(
        `Página contém o(s) seguinte(s) elemento(s): ${foundElements}.`,
      );
      return foundElements;
    }
    if (required) {
      throw new PageLoadError(
        "Página não contém um ou mais elementos obrigatórios.",
      );
    }
    this.debugLog("Página não contém o(s) elemento(s) pesquisado(s).");
    return [];
  }

  saveFilesTmp(name, file) {
    if (!saveFiles) return;

    if (!fs.existsSync("./tmp")) {
      fs.mkdirSync("./tmp");
    }

    // if (!fs.existsSync(`./tmp/${this.search}`)) {
    //   fs.mkdirSync(`./tmp/${this.search}`);
    // }

    // fs.writeFileSync(
    //   `./tmp/${this.search}/${this.param.value.replace(/\//, "")}-${name}`,
    //   file || this.lastBody,
    // );
    fs.writeFileSync(`./tmp/${name}`, file || this.lastBody);
  }
}

export default CrawlerFunctions;
