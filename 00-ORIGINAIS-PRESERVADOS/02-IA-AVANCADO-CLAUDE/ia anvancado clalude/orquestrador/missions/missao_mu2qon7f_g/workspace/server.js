const http = require('http');

const PORT = 3900;

const server = http.createServer((req, res) => {
  try {
    // Validação básica da fronteira do sistema (método e URL)
    const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    
    // Tratamento do caminho feliz e de erro
    if (req.method === 'GET' && urlObj.pathname === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ status: 'success', message: 'Servidor operando normalmente' }));
      return;
    }

    // Caminho não encontrado (Erro 404)
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  } catch (err) {
    // Tratamento de erro interno sem vazar detalhes sensíveis
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
