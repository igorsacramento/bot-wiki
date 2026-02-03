import debug from "debug";
import CrawlerFunctions from "./CrawlerFunctions.js";

class Wikipedia extends CrawlerFunctions {
  constructor(options = {}) {
    super(options);
    this.debugLog = debug("Wikipedia:dev");
  }

  async getHomePage() {
    this.debugLog("Abrindo página inicial da Wikipedia...");

    await this.client(
      "https://pt.wikipedia.org/wiki/Lista_das_maiores_empresas_do_Brasil",
    );
    await this.saveFilesTmp("getHomePage.html");

    this.returnElement(["#mw-content-text table tr"], true);
  }

  parseTable() {
    this.debugLog("Iniciando parsing da tabela...");

    const { $ } = this;
    const tables = $("#mw-content-text > div > table").toArray();
    if (tables.length === 0) {
      this.debugLog("Nenhuma tabela encontrada na página.");
      return;
    }

    const results = [];

    tables.forEach((table) => {
      const rows = $(table).children("tbody").children("tr").toArray();

      const typeValues = this.defineTypeValues(table);

      let positions = {};
      rows.forEach((row, index) => {
        const cols = $(row).children().toArray();
        if (index === 0) {
          positions = this.definePositionColumns(cols);
        } else {
          results.push({
            company_name: this.$(cols[positions.company_name])
              .children("a")
              .text()
              .trim(),
            profit: this.formatProfit(
              this.$(cols[positions.profit]).text().trim(),
              typeValues,
            ),
            rank: parseInt(this.$(cols[positions.rank]).text().trim()),
          });
        }
      });
    });

    return results;
  }

  formatProfit(value, type) {
    this.debugLog(
      `Formatando valor de lucro... Tipo: ${type} | Valor: ${value}`,
    );

    let profit = value;

    if (value.includes(",")) {
      profit = parseFloat(value.replace(/\./g, "").replace(",", "."));
    } else {
      profit = parseFloat(value);
    }

    if (type === "millions") {
      profit = profit / 1000;
    }

    return Number(profit.toFixed(3));
  }

  definePositionColumns(cols) {
    this.debugLog("Definindo posição dos dados nas colunas...");

    const positions = {};

    cols.forEach((col, index) => {
      const text = this.$(col).text().toLowerCase();
      if (text.includes("nome")) {
        positions.company_name = index;
      }
      if (text.includes("lucro")) {
        positions.profit = index;
      }
      if (
        text.includes("classificação") ||
        text.includes("rank") ||
        text.includes("#")
      ) {
        positions.rank = index;
      }
    });

    return positions;
  }

  defineTypeValues(table) {
    this.debugLog("Definindo tipo de valores da tabela...");

    const htmlCols = this.$(table)
      .children("tbody")
      .children("tr")
      .first()
      .html();

    if (htmlCols.includes("milhões")) {
      this.debugLog("A tabela contém valores em milhões.");
      return "millions";
    } else {
      this.debugLog("A tabela contém valores em bilhões.");
      return "billions";
    }
  }

  async get() {
    this.debugLog("Iniciando pesquisa na Wikipedia...");

    await this.getHomePage();

    const results = this.parseTable();

    return {
      results,
      html: this.lastBody,
    };
  }
}

export default Wikipedia;
