/**
 * ROTEAMENTO MULTIMODAL — FASE 9, seção "Roteamento multimodal".
 *
 * Diferencia texto/imagem/áudio/vídeo/misto e escolhe o especialista
 * adequado. Reaproveita `agentes/core/registro-especialistas.js` (não cria
 * um registro paralelo): como `image`/`audio`/`video` são GAPS CONHECIDOS
 * sem agente .md dedicado ainda (documentado desde a FASE 0/4 como
 * "Fase 9 do plano mestre"), o mapeamento real usa o especialista mais
 * próximo já curado — `research` para ANÁLISE (a mesma filosofia de
 * "achados com fonte/confiança declarada" se aplica bem a descrever uma
 * imagem/vídeo ou transcrever um áudio), `coding` para
 * PROCESSAMENTO/CONVERSÃO (gerar/editar arquivo é competência de
 * implementação, igual código). Decisão explícita, não uma omissão.
 */
const { detectarArquivo } = require('./deteccao');

/**
 * @param {string} descricaoTarefa
 * @param {string[]} [caminhosArquivosAbsolutos] - arquivos (já existentes no workspace) relacionados à tarefa
 * @returns {{modalidade:'texto'|'imagem'|'audio'|'video'|'misto', detalheArquivos:object[]}}
 */
function detectarModalidadeDaTarefa(descricaoTarefa = '', caminhosArquivosAbsolutos = []) {
  const detalheArquivos = caminhosArquivosAbsolutos.map((c) => ({ caminho: c, ...detectarArquivo(c) }));
  const modalidadesDosArquivos = new Set(detalheArquivos.filter((d) => d.ok).map((d) => d.modalidade));

  // pistas textuais quando não há arquivo anexado ainda (ex: "gere uma imagem de...")
  const d = String(descricaoTarefa || '').toLowerCase();
  if (/\b(imagem|foto|figura|desenho|ilustra[cç][aã]o|png|jpe?g)\b/.test(d)) modalidadesDosArquivos.add('imagem');
  if (/\b([aá]udio|som|m[uú]sica|transcri[cç][aã]o|mp3|wav)\b/.test(d)) modalidadesDosArquivos.add('audio');
  if (/\b(v[ií]deo|filme|grava[cç][aã]o|mp4|webm)\b/.test(d)) modalidadesDosArquivos.add('video');

  if (modalidadesDosArquivos.size === 0) return { modalidade: 'texto', detalheArquivos };
  if (modalidadesDosArquivos.size === 1) return { modalidade: [...modalidadesDosArquivos][0], detalheArquivos };
  return { modalidade: 'misto', detalheArquivos };
}

/** Mapa modalidade → operação → especialista real (nunca inventa agente). */
const MAPA_ESPECIALISTA = Object.freeze({
  imagem: { analise: 'research', processamento: 'coding' },
  audio: { analise: 'research', processamento: 'coding' },
  video: { analise: 'research', processamento: 'coding' },
  misto: { analise: 'research', processamento: 'coding' },
  texto: { analise: 'research', processamento: 'coding' },
});

/**
 * @param {'imagem'|'audio'|'video'|'misto'|'texto'} modalidade
 * @param {'analise'|'processamento'} [operacao='analise']
 */
function escolherEspecialista(modalidade, operacao = 'analise') {
  const mapa = MAPA_ESPECIALISTA[modalidade] || MAPA_ESPECIALISTA.texto;
  return mapa[operacao] || mapa.analise;
}

module.exports = { detectarModalidadeDaTarefa, escolherEspecialista, MAPA_ESPECIALISTA };
