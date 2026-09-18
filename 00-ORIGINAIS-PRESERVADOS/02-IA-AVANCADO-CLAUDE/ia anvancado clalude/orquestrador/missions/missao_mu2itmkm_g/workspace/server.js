const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Olá, mundo!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Não encontrado');
  }
});

server.listen(3900, () => {
  console.log('Servidor rodando na porta 3900');
});
