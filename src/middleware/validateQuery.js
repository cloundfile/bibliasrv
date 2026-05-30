const { ValidationError } = require('@/utils/errors');

function validateRequiredParams(params, required) {
  for (const key of required) {
    if (params[key] === undefined || params[key] === null || params[key] === '') {
      throw new ValidationError(`Parâmetro obrigatório: ${key}`);
    }
  }
}

function validateNumericParam(value, name) {
  const num = Number(value);
  if (isNaN(num) || num < 1) {
    throw new ValidationError(`${name} deve ser um número válido maior que zero`);
  }
  return num;
}

module.exports = { validateRequiredParams, validateNumericParam };
