// Le o arquivo utils.js e armazena seu conteudo em variavel
// Mantendo o estilo e idioma do projeto (português)
// Não altera utils.js, apenas o le.

const fs = require('fs');
const path = require('path');

// Caminho relativo ao diretório atual
const utilsPath = path.join(__dirname, 'utils.js');

let conteudoUtils = '';
try {
  conteudoUtils = fs.readFileSync(utilsPath, { encoding: 'utf8' });
  // Armazena o conteudo em uma variável global para possível uso posterior
  global.conteudoUtils = conteudoUtils;
  console.log('Conteúdo do utils.js lido com sucesso.');
  // Opcional: imprimir o conteúdo (pode ser removido se não for desejado)
  console.log('--- Início do utils.js ---');
  console.log(conteudoUtils);
  console.log('--- Fim do utils.js ---');
} catch (err) {
  console.error('Erro ao ler utils.js:', err.message);
  process.exit(1);
}
