import debug from "debug";
import { Requests } from "../database/models/index.js";

const debugLogger = debug("databaseTransactions:dev");
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

export async function updateRequestFinished({ requestId, html }) {
  const respondedAt = new Date();
  const [updated] = await Requests.update(
    { respondedAt, html },
    { where: { id: requestId } },
  );
  return updated > 0;
}
