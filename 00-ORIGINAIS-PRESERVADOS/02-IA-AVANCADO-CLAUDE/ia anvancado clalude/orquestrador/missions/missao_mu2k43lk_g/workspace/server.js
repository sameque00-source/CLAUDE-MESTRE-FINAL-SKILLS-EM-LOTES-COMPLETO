const http = require('http');

const PORT = 3900;

const server = http.createServer((req, res) => {
  try {
    // Validação básica da fronteira do sistema (método e URL)
    if (!req.method || !req.url) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Requisição inválida');
      return;
    }

    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n<meta charset="UTF-8">\n<title>Servidor Node.js Nativo</title>\n</head>\n<body>\n<h1>Servidor HTTP Nativo Operacional</h1>\n<p>Resposta HTML bem-sucedida.</p>\n</body>\n</html>');
      return;
    }

    // Caminho de erro: Rota não encontrada
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Página não encontrada');
  } catch (error) {
    // Tratamento de erro interno sem expor detalhes sensíveis
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Erro interno no servidor');
  }
});

server.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
