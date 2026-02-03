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
import { isValidParams } from "../services/validade.js";

debugLogger("Carregando Controller Index");

/**
 * Handler para GET /
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const get = async (req, res, next) => {
  debugLogger("METHOD: GET");

  res.status(200).send({
    status: "success",
    Name: appName,
    Environment: env,
  });
};

/**
 * Handler para POST /
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
const post = async (req, res, next) => {
  debugLogger("METHOD: POST");

  const { rule, billions, range } = req.body;

  try {
    isValidParams({ rule, billions, range });

    const requestId = await saveRequesInitialization({ rule, billions, range });

    const wikipedia = new Wikipedia();
    const { results: wikiData, html } = await wikipedia.get();

    const data = filterByProfit(wikiData, { rule, billions, range });

    updateRequestFinished({ requestId, html });

    res.status(200).send({
      status: "success",
      data,
    });
  } catch (err) {
    const statusCode = err.status || 500;

    res.status(statusCode).send({
      status: "error",
      message: err.message,
    });
  }
};

export default [
  { active: true, method: "get", path: "/", func: get },
  { active: true, method: "post", path: "/", func: post },
];
