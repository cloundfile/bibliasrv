const oracaoRep = require('@/repositories/oracaoRep');
const { ValidationError, DatabaseError } = require('@/utils/errors');

const oracaoService = {
  async criar(dados) {
    if (!dados.nome || !dados.nome.trim()) {
      throw new ValidationError('Nome é obrigatório');
    }
    if (!dados.email || !dados.email.trim()) {
      throw new ValidationError('E-mail é obrigatório');
    }
    if (!dados.pedido || !dados.pedido.trim()) {
      throw new ValidationError('Pedido de oração é obrigatório');
    }
    if (!dados.consentimento) {
      throw new ValidationError('Consentimento é obrigatório');
    }

    try {
      const duplicata = await oracaoRep.buscarDuplicata(
        dados.nome.trim(), dados.email.trim(), dados.pedido.trim()
      );
      if (duplicata) {
        throw new ValidationError('Este pedido de oração já foi enviado.');
      }

      await oracaoRep.criar({
        nome: dados.nome.trim(),
        email: dados.email.trim(),
        pedido: dados.pedido.trim(),
        consentimento: true,
      });
      return { success: true };
    } catch (err) {
      throw new DatabaseError(err.message || 'Erro ao salvar pedido de oração');
    }
  },

  async listarTodos() {
    try {
      return await oracaoRep.listarTodos();
    } catch (err) {
      throw new DatabaseError(err.message || 'Erro ao buscar pedidos de oração');
    }
  },
};

module.exports = oracaoService;
