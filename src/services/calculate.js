import debug from "debug";
import _ from "lodash";
const debugLog = debug("calculate:dev");

/**
 * Formata o profit dividindo por 1000
 * @param {Array} data - Array de objetos { company_name, profit, rank }
 * @returns {Array} - Array com profit formatado
 */
export function formatProfit(data) {
  debugLog("Formatando profit dividindo por 1000...");
  return _.map(data, (item) => ({
    ...item,
    profit: item.profit / 1000,
  }));
}

/**
 * Filtra empresas pelo lucro conforme a regra.
 * @param {Array} data - Array de objetos { company_name, profit, rank }
 * @param {Object} options - { rule: "greater"|"smaller"|"between", billions: number, range?: [number, number] }
 * @returns {Array} - Array filtrado conforme a regra
 */
export function filterByProfit(data, options) {
  debugLog("Processing array data...");
  const { rule, billions, range } = options;

  if (rule === "greater") {
    return formatProfit(_.filter(data, (o) => o.profit > billions));
  }
  if (rule === "smaller") {
    return formatProfit(_.filter(data, (o) => o.profit < billions));
  }
  if (rule === "between" && Array.isArray(range) && range.length === 2) {
    return formatProfit(
      _.filter(data, (o) => o.profit >= range[0] && o.profit <= range[1]),
    );
  }

  return [];
}
