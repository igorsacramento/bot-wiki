import * as cheerio from "cheerio";
import debug from "debug";
import got from "got";
import mime from "mime-types";
import tunnel from "tunnel";

import config from "../config/index.js";

class CrawlerInit {
  constructor({ gotOptions = {} } = {}) {
    this.debugLog = debug("CrawlerInit:dev");

    this.gotOptions = gotOptions;

    this.gotInit();
  }

  gotInit() {
    this.debugLog("Iniciando Crawler...");

    let afterResponse = this.setAfterResponse();
    if (this.gotOptions.hooks && this.gotOptions.hooks.afterResponse) {
      afterResponse = [
        ...afterResponse,
        ...this.gotOptions.hooks.afterResponse,
      ];
    }

    this.options = {
      retry: { limit: 10 },
      timeout: { request: 60000 },
      https: { rejectUnauthorized: false },
      mutableDefaults: true,
      ...this.gotOptions,
      hooks: {
        afterResponse,
      },
    };

    this.client = got.extend(this.options);
    this.paginate = got.paginate;

    // Monta o proxy
    if (config.proxy) {
      this.setProxy();
    }
  }

  setAfterResponse() {
    this.debugLog("Configurando afterResponse...");

    // Garante que this.options existe antes de definir hooks
    if (!this.options) this.options = {};

    const afterResponse = [
      (response, retryWithMergedOptions) => {
        this.debugLog("afterResponse");
        const {
          body,
          statusCode,
          headers: responseHeaders,
          rawBody,
          timings,
        } = response;

        this.debugLog(`Status Code: ${statusCode}`);

        const {
          requestUrl: href,
          // options: {
          //   method,
          //   headers: requestHeaders,
          //   body: requestBody,
          //   form: requestForm,
          //   json: requestJson,
          // },
        } = response.request;

        this.lastUrl = href;
        this.lastBody = body;

        const ext = mime.extension(responseHeaders["content-type"]) || "bin";
        if (ext === "html" || ext === "xml") {
          this.$ = cheerio.load(this.lastBody);
        } else {
          this.$ = null;
        }

        return response;
      },
    ];

    return afterResponse;
  }

  setProxy() {
    this.debugLog(`Configurando proxy: ${config.proxy}`);

    const {
      hostname: proxyHost,
      port: proxyPort,
      username: proxyUser,
      password: proxyPassword,
    } = new URL(config.proxy);

    const crawlerProxy = {
      host: proxyHost,
      port: proxyPort,
      proxyAuth:
        proxyUser && proxyPassword ? `${proxyUser}:${proxyPassword}` : null,
    };
    this.options.agent = {
      http: tunnel.httpOverHttp({ proxy: crawlerProxy }),
      https: tunnel.httpsOverHttp({ proxy: crawlerProxy }),
    };
    // Atualiza o client
    this.client = got.extend(this.options);
  }
}

export default CrawlerInit;
