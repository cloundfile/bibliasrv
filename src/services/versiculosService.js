const livrosRep = require('@/repositories/livrosRep');
const capitulosRep = require('@/repositories/capitulosRep');
const versiculosRep = require('@/repositories/versiculosRep');
const { NotFoundError } = require('@/utils/errors');

const versiculosService = {
  async listarPorCapitulo(sigla, numeroCapitulo) {
    const livro = await livrosRep.getBySigla(sigla);
    if (!livro) throw new NotFoundError('Livro não encontrado');

    const capitulo = await capitulosRep.getByLivroAndNumero(livro.id, numeroCapitulo);
    if (!capitulo) throw new NotFoundError('Capítulo não encontrado');

    const versiculos = await versiculosRep.getByCapituloId(capitulo.id);

    return {
      livro: livro.nome,
      sigla: livro.sigla,
      testamento: livro.testamento,
      capitulo: numeroCapitulo,
      versiculos,
    };
  },

  async buscarReferencia(sigla, capitulo, versiculo) {
    const resultado = await versiculosRep.getByReference(sigla, capitulo, versiculo);
    if (!resultado) throw new NotFoundError('Versículo não encontrado');

    return {
      livro: resultado.livro_nome,
      sigla: resultado.livro_sigla,
      testamento: resultado.livro_testamento,
      capitulo: resultado.capitulo_numero,
      versiculo: resultado.versiculo_numero,
      texto: resultado.versiculo_texto,
    };
  },

  async versiculoDoDia() {
    const resultado = await versiculosRep.getRandom();
    if (!resultado) throw new NotFoundError('Nenhum versículo encontrado');

    return {
      livro: resultado.livro_nome,
      sigla: resultado.livro_sigla,
      testamento: resultado.livro_testamento,
      capitulo: resultado.capitulo_numero,
      versiculo: resultado.versiculo_numero,
      texto: resultado.versiculo_texto,
    };
  },

  async buscar(termo) {
    return versiculosRep.search(termo);
  },

  async stats() {
    return versiculosRep.getStats();
  },

  async exportarLivro(sigla) {
    const livro = await livrosRep.getBySigla(sigla);
    if (!livro) throw new NotFoundError('Livro não encontrado');

    const capitulos = await capitulosRep.getByLivroId(livro.id);
    const dadosCompletos = [];

    for (const cap of capitulos) {
      const versiculos = await versiculosRep.getByCapituloId(cap.id);
      dadosCompletos.push({
        capitulo: cap.numero,
        versiculos: versiculos.map(v => ({ numero: v.numero, texto: v.texto })),
      });
    }

    return {
      livro: livro.nome,
      sigla: livro.sigla,
      testamento: livro.testamento,
      conteudo: dadosCompletos,
    };
  },
};

module.exports = versiculosService;
