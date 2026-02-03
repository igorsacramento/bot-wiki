import debug from "debug";

import { HttpError } from "../libs/Errors.js";

const debugLog = debug("validade:dev");

/**
 * Valida os parâmetros da requisição para filtragem de empresas.
 * @param {Object} params - Parâmetros da requisição
 * @param {string} params.rule - Regra de filtragem (greater, smaller, between)
 * @param {number} params.billions - Valor de corte para as regras greater/smaller
 * @param {Array<number>} [params.range] - Intervalo para a regra between
 * @throws {HttpError} Se algum parâmetro estiver inválido
 */
export function isValidParams(params = {}) {
  debugLog("Validando parâmetros...");

  const { rule, billions, range } = params;

  if (!rule) {
    throw new HttpError("rule is not defined.");
  }

  if (rule !== "between" || !billions) {
    throw new HttpError("billions is not defined.");
  }

  if (rule === "between" && (!Array.isArray(range) || range.length !== 2)) {
    throw new HttpError("range is not defined.");
  }

  if (rule === "greater" || rule === "smaller") {
    if (isNaN(Number(billions))) {
      throw new HttpError("billions is not a valid number.");
    }
  }

  if (rule !== "greater" && rule !== "smaller" && rule !== "between") {
    throw new HttpError("rule is not supported.");
  }
}
