import debug from "debug";
const debugLogger = debug("controller-Index:dev");

import config from "../config/index.js";
const { appName, env } = config;

import Wikipedia from "../../bot/services/Wikipedia.js";
import { filterByProfit } from "../services/calculate.js";
import {
  saveRequesInitialization,
  updateRequestFinished,
} from "../services/databaseTransactions.js";

debugLogger("Carregando Controller Index");

const get = async (req, res, next) => {
  debugLogger("METHOD: GET");

  res.status(200).send({
    status: "success",
    Name: appName,
    Environment: env,
    Data: data,
  });
};

const post = async (req, res, next) => {
  debugLogger("METHOD: POST");

  const { rule, billions, range } = req.body;

  if (!rule || !billions || !range) {
    return res.status(400).send({
      status: "error",
      message: "Parâmetros inválidos. 'rule' e 'billions' são obrigatórios.",
    });
  }

  if (rule === "between" && (!Array.isArray(range) || range.length !== 2)) {
    return res.status(400).send({
      status: "error",
      message:
        "Parâmetro 'range' inválido. Deve ser um array com dois números.",
    });
  }

  const requestId = await saveRequesInitialization({ rule, billions, range });

  const wikipedia = new Wikipedia();
  const { results: wikiData, html } = await wikipedia.get();

  const data = filterByProfit(wikiData, { rule, billions, range });

  updateRequestFinished({ requestId, html });

  res.status(200).send({
    status: "success",
    data,
  });
};

export default [
  { active: true, method: "get", path: "/", func: get },
  { active: true, method: "post", path: "/", func: post },
];
