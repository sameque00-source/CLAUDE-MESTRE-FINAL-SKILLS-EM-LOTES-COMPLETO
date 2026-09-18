// Le o arquivo utils.js e armazena seu conteudo em uma variavel.
// Este script demonstra como acessar o arquivo existente sem alterar nada.
const fs = require('fs');
const path = require('path');

// caminho relativo ao script
const utilsPath = path.join(__dirname, 'utils.js');

// leitura síncrona (arquivo pequeno)
let utilsContent;
try {
  utilsContent = fs.readFileSync(utilsPath, 'utf8');
} catch (err) {
  console.error('Erro ao ler utils.js:', err.message);
  process.exit(1);
}

// armazenado na variavel utilsContent
// opcional: imprimir para verificação
console.log(utilsContent);
