const livrosRep = require('@/repositories/livrosRep');
const { NotFoundError } = require('@/utils/errors');

const livrosService = {
  async listarTodos() {
    const livros = await livrosRep.getAll();
    return livros;
  },

  async buscarPorSigla(sigla) {
    const livro = await livrosRep.getBySigla(sigla);
    if (!livro) throw new NotFoundError('Livro não encontrado');
    return livro;
  },
};

module.exports = livrosService;
