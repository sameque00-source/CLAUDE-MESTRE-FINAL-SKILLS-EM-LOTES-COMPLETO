const http = require('http');

const PORT = 3900;

const server = http.createServer((req, res) => {
  // Validação de entrada na fronteira do sistema (Método e URL)
  const urlPath = req.url ? req.url.split('?')[0] : '';
  
  if (req.method === 'GET' && urlPath === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<h1>Ol&aacute;, mundo!</h1>');
    return;
  }

  // Caminho de erro: Rota não encontrada
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
