const { execute } = require('@/config/database');

const oracaoRep = {
  async buscarDuplicata(nome, email, pedido) {
    const result = await execute(
      `SELECT id FROM pedidos_oracao
       WHERE LOWER(nome) = LOWER(:1)
         AND LOWER(email) = LOWER(:2)
         AND pedido = :3`,
      [nome, email, pedido]
    );
    return result.rows.length > 0;
  },

  async criar(dados) {
    await execute(
      `INSERT INTO pedidos_oracao (nome, email, pedido, consentimento)
       VALUES (:1, :2, :3, :4)`,
      [dados.nome, dados.email, dados.pedido, dados.consentimento ? 1 : 0],
      { autoCommit: true }
    );
    return true;
  },

  async listarTodos() {
    const result = await execute(
      `SELECT id, nome, pedido, criado_em
       FROM pedidos_oracao
       ORDER BY criado_em DESC`
    );
    return result.rows;
  },
};

module.exports = oracaoRep;
