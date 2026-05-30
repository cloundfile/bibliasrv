const livrosRep = require('@/repositories/livrosRep');
const capitulosRep = require('@/repositories/capitulosRep');
const { NotFoundError } = require('@/utils/errors');

const capitulosService = {
  async listarPorSigla(sigla) {
    const livro = await livrosRep.getBySigla(sigla);
    if (!livro) throw new NotFoundError('Livro não encontrado');

    const capitulos = await capitulosRep.getByLivroId(livro.id);
    return { ...livro, capitulos };
  },

  async buscarCapitulo(sigla, numero) {
    const livro = await livrosRep.getBySigla(sigla);
    if (!livro) throw new NotFoundError('Livro não encontrado');

    const capitulo = await capitulosRep.getByLivroAndNumero(livro.id, numero);
    if (!capitulo) throw new NotFoundError('Capítulo não encontrado');

    return { livro, capitulo };
  },
};

module.exports = capitulosService;
