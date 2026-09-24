/**
 * Roteador — escolhe modelo(s) candidatos a partir do nível/modalidade decididos
 * pelo classificador, e define a cadeia de fallback (só entre opções free=true).
 *
 * NÃO faz a chamada de API de fato aqui (isso é responsabilidade de um executor
 * separado, ainda não implementado — Fase 15+ do plano). Este módulo só decide
 * "quem tentar, em que ordem".
 */

const fs = require('fs');
const path = require('path');
const { classify } = require('../classifier/classify');

const CATALOG_PATH = path.join(__dirname, '..', 'catalog', 'models.json');

function loadCatalog() {
  const raw = fs.readFileSync(CATALOG_PATH, 'utf8');
  return JSON.parse(raw);
}

/** Filtra candidatos elegíveis: sempre free=true e requires_card não-true. */
function eligible(catalog, predicate) {
  return catalog.models
    .filter((m) => m.free === true && m.requires_card !== true)
    .filter(predicate)
    .sort((a, b) => (b.priority || 0) - (a.priority || 0));
}

function pickForModality(catalog, modality, level) {
  if (modality === 'vision') {
    return eligible(catalog, (m) => m.vision === true);
  }
  if (modality === 'image_gen') {
    return eligible(catalog, (m) => m.modality.includes('image_gen'));
  }
  if (modality === 'video_gen') {
    return []; // gap conhecido — ver catalog.models.json._meta.note_video
  }
  if (modality === 'audio') {
    return eligible(catalog, (m) => m.modality.includes('audio_tts') || m.modality.includes('audio_stt'));
  }
  // texto — filtra por level_tags batendo com o nível, com fallback pro próximo nível acima
  const byLevel = eligible(catalog, (m) => m.modality.includes('text') && (m.level_tags || []).includes(level));
  if (byLevel.length > 0) return byLevel;
  // fallback: nenhum modelo taggeado exatamente nesse nível — pega o de nível mais próximo acima
  for (let l = level + 1; l <= 4; l++) {
    const higher = eligible(catalog, (m) => m.modality.includes('text') && (m.level_tags || []).includes(l));
    if (higher.length > 0) return higher;
  }
  // último recurso: qualquer modelo de texto disponível
  return eligible(catalog, (m) => m.modality.includes('text'));
}

/**
 * route(input, opts) → { classification, plan: [{modality, candidates: [...ids em ordem de fallback]}], gaps }
 */
function route(input, opts = {}) {
  const catalog = loadCatalog();
  const classification = classify(input, opts);
  const plan = [];
  const gaps = [];

  for (const modality of classification.modality) {
    const candidates = pickForModality(catalog, modality, classification.level);
    if (candidates.length === 0) {
      gaps.push({ modality, reason: 'nenhum provedor gratuito confirmado disponível para esta modalidade' });
      continue;
    }
    // cadeia de fallback: no máximo 3 candidatos, de provedores diferentes quando possível
    const chain = [];
    const seenProviders = new Set();
    for (const c of candidates) {
      if (chain.length >= 3) break;
      if (seenProviders.has(c.provider) && chain.length > 0) continue; // prioriza diversidade de provedor
      chain.push({ id: c.id, provider: c.provider, model: c.model, endpoint: c.endpoint });
      seenProviders.add(c.provider);
    }
    // se diversificar deixou a cadeia curta demais, completa com o que sobrou
    if (chain.length < Math.min(3, candidates.length)) {
      for (const c of candidates) {
        if (chain.length >= 3) break;
        if (!chain.find((x) => x.id === c.id)) {
          chain.push({ id: c.id, provider: c.provider, model: c.model, endpoint: c.endpoint });
        }
      }
    }
    plan.push({ modality, candidates: chain });
  }

  return {
    input,
    level: classification.level,
    effort: classification.effort,
    useAgents: classification.useAgents,
    useRuflo: classification.useRuflo,
    useSkills: classification.useSkills,
    useBrowser: classification.useBrowser,
    plan,
    gaps,
  };
}

module.exports = { route };

if (require.main === module) {
  const casos = [
    'olá',
    'crie um pequeno script em python que soma dois números',
    'analise esta arquitetura de microsserviços e aponte gargalos',
    'crie um projeto completo de e-commerce full-stack com múltiplas etapas',
    'analise esta imagem e me diga o que tem nela',
    'gere uma imagem de um gato astronauta',
    'gere um vídeo de um foguete decolando',
  ];
  for (const c of casos) {
    console.log(JSON.stringify(route(c), null, 2));
    console.log('---');
  }
}
