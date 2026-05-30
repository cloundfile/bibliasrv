const logger = require('@/utils/logger');

function errorHandler(err) {
  logger.error('Erro na requisição', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  return Response.json(
    { success: false, error: message },
    { status: statusCode }
  );
}

module.exports = { errorHandler };
