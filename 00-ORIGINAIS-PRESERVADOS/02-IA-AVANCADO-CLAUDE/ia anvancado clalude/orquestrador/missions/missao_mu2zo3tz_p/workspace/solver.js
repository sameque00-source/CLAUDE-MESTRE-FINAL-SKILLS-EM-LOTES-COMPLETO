/**
 * Soma dois numeros a e b.
 * @param {number} a - O primeiro numero.
 * @param {number} b - O segundo numero.
 * @returns {number} - O resultado da soma.
 * @throws {TypeError} Se o argumento nao for um Number ou for NaN.
 */
function soma(a, b) {
  // Validação rigorosa de tipo e valor
  if (typeof a !== 'number' || Number.isNaN(a)) {
    throw new TypeError(`O argumento 'a' deve ser um numero valido e deve ser do tipo number. Recebido: ${typeof a}`);
  }
  
  if (typeof b !== 'number' || Number.isNaN(b)) {
    throw new TypeError(`O argumento 'b' deve ser um numero valido e deve ser do tipo number. Recebido: ${typeof b}`);
  }
  
  return a + b;
}

// TESTE DA FUNÇÃO
function testar(valido) {
  if (valido) {
    try {
      const resultado = soma(5, 3);
      console.log(`Sucesso! 5 + 3 = ${resultado}`);
    } catch (error) {
      console.error(`Falha inesperada no teste valido: ${error.message}`);
    }
  } else {
    try {
      soma("5", 3);
      console.log("Falha: O teste invalido deveria ter falhado, mas não falhou.");
    } catch (error) {
      if (error instanceof TypeError) {
        console.log("Sucesso no tratamento de erro: Capturamos a TypeError como esperado.");
      } else {
        console.error(`Erro inesperado: ${error.name} - ${error.message}`);
      }
    }
  }
}

// Execução dos testes
if (require.main === module) {
  try {
    testar(true);
    testar(false);
  } catch (err) {
    console.error("Falha geral ao executar testes: " + err.message);
    process.exitCode = 1;
  }
}
