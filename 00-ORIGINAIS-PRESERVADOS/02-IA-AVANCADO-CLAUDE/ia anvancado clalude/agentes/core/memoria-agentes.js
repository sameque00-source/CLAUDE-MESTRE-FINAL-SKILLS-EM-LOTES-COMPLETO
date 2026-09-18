/**
 * MEMÓRIA DE AGENTES — FASE 4, seção 22 do pedido.
 *
 * "Não implementar memória de longo prazo completa ainda. Mas registrar:
 * agente usado; tarefa; resultado; sucesso; falha; tempo." — exatamente
 * isso, nada mais. Append-only JSONL, mesmo padrão já usado em
 * `AI-ORCHESTRATOR/logs/gateway.jsonl` — best-effort, nunca derruba a
 * missão se a escrita falhar.
 */
const fs = require('fs');
const path = require('path');

const LOG_PATH = path.join(__dirname, '..', 'logs', 'agentes.jsonl');

function registrarUso({ especialista, tarefaId, tarefaTipo, missaoId, sucesso, tempoMs, resumoResultado }) {
  try {
    fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
    const linha = {
      ts: new Date().toISOString(), especialista, tarefaId, tarefaTipo, missaoId,
      sucesso: !!sucesso, tempoMs: tempoMs || 0,
      resumoResultado: String(resumoResultado || '').slice(0, 200), // nunca secrets, só resumo curto
    };
    fs.appendFileSync(LOG_PATH, JSON.stringify(linha) + '\n', 'utf8');
  } catch (e) {
    console.error(`[memoria-agentes] falha ao registrar (não bloqueante): ${e.message}`);
  }
}

/** Estatística simples por especialista — usada por fases futuras (não implementado além disso agora). */
function estatisticasPorEspecialista() {
  try {
    const linhas = fs.readFileSync(LOG_PATH, 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
    const porEspecialista = {};
    for (const l of linhas) {
      porEspecialista[l.especialista] = porEspecialista[l.especialista] || { total: 0, sucesso: 0, tempoTotalMs: 0 };
      porEspecialista[l.especialista].total++;
      if (l.sucesso) porEspecialista[l.especialista].sucesso++;
      porEspecialista[l.especialista].tempoTotalMs += l.tempoMs || 0;
    }
    return porEspecialista;
  } catch {
    return {};
  }
}

module.exports = { registrarUso, estatisticasPorEspecialista, LOG_PATH };
