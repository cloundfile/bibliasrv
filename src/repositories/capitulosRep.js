const { execute } = require('@/config/database');

const capitulosRep = {
  async create(livroId, numero) {
    const result = await execute(
      `INSERT INTO capitulos (livro_id, numero)
       VALUES (:1, :2)`,
      [livroId, numero]
    );
    return result.lastRowid;
  },

  async getByLivroId(livroId) {
    const result = await execute(
      `SELECT * FROM capitulos WHERE livro_id = :1 ORDER BY numero ASC`,
      [livroId]
    );
    return result.rows;
  },

  async getByLivroAndNumero(livroId, numero) {
    const result = await execute(
      `SELECT * FROM capitulos WHERE livro_id = :1 AND numero = :2`,
      [livroId, numero]
    );
    return result.rows[0] || null;
  },
};

module.exports = capitulosRep;
