import debug from "debug";

import { HttpError } from "../libs/Errors.js";

const debugLog = debug("validade:dev");

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
