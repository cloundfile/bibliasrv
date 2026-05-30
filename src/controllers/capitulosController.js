const capitulosService = require('@/services/capitulosService');
const { success, error } = require('@/utils/apiResponse');

const capitulosController = {
  async listarPorSigla(request, { params }) {
    try {
      const data = await capitulosService.listarPorSigla(params.sigla);
      return Response.json(success(data));
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },

  async buscarCapitulo(request, { params }) {
    try {
      const { sigla, capitulo } = params;
      const numCapitulo = parseInt(capitulo, 10);
      if (isNaN(numCapitulo) || numCapitulo < 1) {
        return Response.json(error('Capítulo deve ser um número válido', 400), { status: 400 });
      }

      const versiculosService = require('@/services/versiculosService');
      const data = await versiculosService.listarPorCapitulo(sigla, numCapitulo);
      return Response.json(success(data));
    } catch (err) {
      const status = err.statusCode || 500;
      return Response.json(error(err.message, status), { status });
    }
  },
};

module.exports = capitulosController;
