class NotFoundError extends Error {
  constructor(message = 'Recurso não encontrado') {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

class ValidationError extends Error {
  constructor(message = 'Parâmetros inválidos') {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

class DatabaseError extends Error {
  constructor(message = 'Erro no banco de dados') {
    super(message);
    this.name = 'DatabaseError';
    this.statusCode = 500;
  }
}

module.exports = { NotFoundError, ValidationError, DatabaseError };
