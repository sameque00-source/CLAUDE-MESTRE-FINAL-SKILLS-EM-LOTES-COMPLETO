const http = require('http');

const PORT = 3900;

const server = http.createServer((req, res) => {
  // Validação na fronteira do sistema
  if (req.url !== '/' || req.method !== 'GET') {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<!DOCTYPE html><html><head><title>404 Not Found</title></head><body><h1>404 Não encontrado</h1></body></html>');
    return;
  }

  // Condição feliz
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Ola, mundo!</title></head><body><h1>Ola, mundo!</h1></body></html>');
});

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
