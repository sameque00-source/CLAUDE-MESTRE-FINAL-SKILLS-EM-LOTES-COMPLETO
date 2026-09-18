const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3900;
const MAX_BODY_SIZE = 1e6; // Limite de 1MB para payload

const server = http.createServer((req, res) => {
  // Validação na fronteira do sistema: URL e host
  let parsedUrl;
  try {
    parsedUrl = new url.URL(req.url, `http://${req.headers.host || 'localhost'}`);
  } catch (err) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'URL malformada ou inválida' }));
    return;
  }

  const { pathname } = parsedUrl;

  // Cabeçalhos de segurança padrão
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  // Tratamento de rotas e métodos
  if (req.method === 'GET' && pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', message: 'Servidor HTTP nativo ativo na porta 3900' }));
    return;
  }

  if (req.method === 'GET' && pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'healthy', uptime: process.uptime() }));
    return;
  }

  if (req.method === 'POST' && pathname === '/data') {
    let body = '';
    let bodySize = 0;
    let tooLarge = false;

    req.on('data', chunk => {
      bodySize += chunk.length;
      if (bodySize > MAX_BODY_SIZE) {
        tooLarge = true;
        req.destroy(); // Interrompe stream para conter abuso
      } else {
        body += chunk;
      }
    });

    req.on('end', () => {
      if (tooLarge) {
        res.writeHead(413, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Payload excede o limite máximo permitido' }));
        return;
      }

      try {
        const parsedBody = body ? JSON.parse(body) : {};
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, data: parsedBody }));
      } catch (parseErr) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Corpo da requisição contém JSON inválido' }));
      }
    });

    req.on('error', () => {
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erro no processamento da requisição' }));
      }
    });

    return;
  }

  // Tratamento de rota não encontrada (404)
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Rota não encontrada' }));
});

// Tratamento de erros do servidor (ex: porta em uso)
server.on('error', err => {
  console.error('[SERVER ERROR]', err.message);
});

server.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});
