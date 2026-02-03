import debug from "debug";
import { Requests } from "../database/models/index.js";

const debugLogger = debug("databaseTransactions:dev");
/**
 * Salva a inicialização de uma requisição no banco de dados.
 * @param {Object} options - Opções da requisição
 * @param {string} options.rule - Regra de filtragem (greater, smaller, between)
 * @param {number} options.billions - Valor de corte para as regras greater/smaller
 * @param {Array<number>} [options.range] - Intervalo para a regra between
 * @returns {Promise<string>} - Retorna o id da requisição criada
 */
export function saveRequesInitialization(options = {}) {
  debugLogger("Salvando inicialização de requisição no banco de dados");

  const { rule, billions, range } = options;

  let rangeInit = null;
  let rangeEnd = null;

  if (range && range.length === 2) {
    rangeInit = range[0];
    rangeEnd = range[1];
  }

  return Requests.create({
    rule,
    billions,
    rangeInit,
    rangeEnd,
  }).then((request) => {
    debugLogger(`Requisição inicializada com ID: ${request.id}`);
    return request.id;
  });
}

/**
 * Atualiza a requisição com o campo respondedAt e html ao finalizar.
 * @param {Object} params
 * @param {string} params.requestId - UUID da requisição
 * @param {string} params.html - HTML retornado
 * @returns {Promise<boolean>} - true se atualizado com sucesso
 */
export async function updateRequestFinished({ requestId, html }) {
  const respondedAt = new Date();
  const [updated] = await Requests.update(
    { respondedAt, html },
    { where: { id: requestId } },
  );
  return updated > 0;
}
