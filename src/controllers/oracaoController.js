const oracaoService = require('@/services/oracaoService');
const { success, error } = require('@/utils/apiResponse');

const oracaoController = {
  async criar(request) {
    try {
      const dados = await request.json();
      const result = await oracaoService.criar(dados);
      return Response.json(success(result), { status: 201 });
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },

  async listarTodos() {
    try {
      const pedidos = await oracaoService.listarTodos();
      return Response.json(success(pedidos));
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },
};

module.exports = oracaoController;
