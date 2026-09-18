const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor HTTP rodando com sucesso!\n');
});

const PORT = 3900;
server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
