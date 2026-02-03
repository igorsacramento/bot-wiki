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
    const tables = $("#mw-content-text table").toArray();
    if (tables.length === 0) {
      this.debugLog("Nenhuma tabela encontrada na página.");
      return;
    }

    const results = [];

    const rows = $(tables[0]).children("tbody").children("tr").toArray();
    rows.forEach((row) => {
      const cols = $(row).children("td").toArray();

      if (!$(cols[2]).children("a").text().trim()) return;

      results.push({
        company_name: $(cols[2]).children("a").text().trim(),
        profit: parseFloat(
          $(cols[4]).text().trim().replace(/\./g, "").replace(",", "."),
        ),
        rank: $(cols[1]).text().trim(),
      });
    });

    return results;
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
