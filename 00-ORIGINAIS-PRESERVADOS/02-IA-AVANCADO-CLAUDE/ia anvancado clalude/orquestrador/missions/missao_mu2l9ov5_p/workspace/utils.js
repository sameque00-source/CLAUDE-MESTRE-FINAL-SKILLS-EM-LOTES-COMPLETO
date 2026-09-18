/**
 * Valida se um CPF é matematicamente válido.
 * Considera digitos verificadores e números sequenciais inválidos.
 * @param {string} cpf - O CPF a ser validado.
 * @returns {boolean} - Retorna true se válido, false caso contrário.
 * @throws {TypeError} - Lança erro se o input não for string.
 */
function validarCPF(cpf) {
  if (typeof cpf !== 'string') {
    throw new TypeError('O CPF deve ser uma string.');
  }

  const cleanCPF = cpf.replace(/\D/g, '');

  if (cleanCPF.length !== 11 || /^(\d)\1+$/.test(cleanCPF)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cleanCPF.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
}

module.exports = { validarCPF };