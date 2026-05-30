const livrosService = require('@/services/livrosService');
const { success, error } = require('@/utils/apiResponse');

const livrosController = {
  async listarTodos() {
    try {
      const livros = await livrosService.listarTodos();
      return Response.json(success(livros));
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },

  async buscarPorSigla(request, { params }) {
    try {
      const livro = await livrosService.buscarPorSigla(params.sigla);
      return Response.json(success(livro));
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },
};

module.exports = livrosController;
