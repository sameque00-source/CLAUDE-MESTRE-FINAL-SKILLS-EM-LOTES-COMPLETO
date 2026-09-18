/**
 * EXPIRAÇÃO — FASE 6, seção 16 do pedido. TTL variável por tipo já é
 * aplicado na gravação (`armazenamento.gravar` usa `VALIDADE_PADRAO_MS`);
 * este módulo é a camada de CONSULTA — decide se um registro já gravado
 * ainda está válido no momento em que alguém tenta usá-lo.
 */

function estaValida(registro) {
  if (!registro) return false;
  if (registro.invalidada) return false;
  if (registro.expiraEm && Date.now() > registro.expiraEm) return false;
  return true;
}

function estaProximaDeExpirar(registro, margemMs = 24 * 60 * 60 * 1000) {
  if (!registro || !registro.expiraEm) return false;
  return estaValida(registro) && (registro.expiraEm - Date.now()) < margemMs;
}

module.exports = { estaValida, estaProximaDeExpirar };
