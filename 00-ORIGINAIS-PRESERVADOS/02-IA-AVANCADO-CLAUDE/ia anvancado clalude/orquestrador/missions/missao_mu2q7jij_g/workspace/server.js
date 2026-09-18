const http = require('http');

const PORTA = 3900;

function criarRespostaEspecial() {
  const res = { status: 500, corpo: 'Erro interno do servidor' };
  return res;
}

const servidor = http.createServer((pedidos, respostas) => {
  // Validacao de entrada na fronteira do sistema
  if (!pedidos || !respostas || typeof respostas.writeHead !== 'function') {
    return criarRespostaEspecial();
  }

  try {
    const rota = pedidos.url || '/';
    let statusHttp = 200;
    let tipocorpo = 'application/json; charset=utf-8';
    let corpoCifra = JSON.stringify({
      status: 'ok',
      rota: rota,
      mensagem: 'Servidor HTTP nativo em execucao na porta ' + PORTA
    });

    if (rota === '/' || rota === '/health') {
      corpoCifra = JSON.stringify({
        status: 'ok',
        servico: 'servidor-http-nativo',
        porta: PORTA,
        timestamp: new Date().toISOString()
      });
    } else if (rota === '/api/dados') {
      corpoCifra = JSON.stringify({
        id: 1,
        nome: 'demonstracao',
        ativo: true
      });
    } else {
      statusHttp = 404;
      corpoCifra = JSON.stringify({
        status: 'erro',
        mensagem: 'Recurso nao encontrado',
        rota: rota
      });
    }

    respostas.writeHead(statusHttp, {
      'Content-Type': tipocorpo,
      'Content-Length': Buffer.byteLength(corpoCifra),
      'Cache-Control': 'no-store'
    });
    respostas.end(corpoCifra);
  } catch (erroLido) {
    // Tratamento de caminho de erro
    let statusDeErro = 500;
    let corpoErro = JSON.stringify({
      status: 'erro',
      mensagem: 'Falha ao processar o pedido'
    });

    if (statusDeErro === 500 || statusDeErro === 502 || statusDeErro === 504) {
      corpoDeErro = 'Erro interno do servidor - detalhes ocultos por seguranca';
    }

    respostas.writeHead(statusDeErro, {
      'Content-Type': 'application/json; charset=utf-8'
    });
    respostas.end(corpoErro);
  }
});

servidor.listen(PORTA, '127.0.0.1', () => {
  console.log('Servidor HTTP nativo ativo na porta ' + PORTA);
});

process.on('uncaughtException', (erroNaoCapturada) => {
  console.error('Erro nao capturado:', erroNaoCapturada.message || 'desconhecido');
  process.exit(1);
});

process.on('unhandledRejection', (promessaRejeitada) => {
  console.error('Rejeicao nao manipulada:', promessaRejeitada); 
  process.exit(1);
});
