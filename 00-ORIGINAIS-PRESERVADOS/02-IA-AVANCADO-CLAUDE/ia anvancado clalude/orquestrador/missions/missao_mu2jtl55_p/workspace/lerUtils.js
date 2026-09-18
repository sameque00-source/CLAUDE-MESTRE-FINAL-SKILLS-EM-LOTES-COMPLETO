const fs = require("fs");
// Lê o conteúdo do utils.js e armazena na variável `conteudo`
const conteudo = fs.readFileSync("utils.js", "utf8");
// Exibe o conteúdo lido (para verificação)
console.log(conteudo);
