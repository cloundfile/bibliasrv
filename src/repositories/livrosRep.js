const { execute } = require('@/config/database');

const livrosRep = {
  async getAll() {
    const result = await execute(
      `SELECT * FROM livros ORDER BY ordem ASC`
    );
    return result.rows;
  },

  async getBySigla(sigla) {
    const result = await execute(
      `SELECT * FROM livros WHERE LOWER(sigla) = LOWER(:1)`,
      [sigla]
    );
    return result.rows[0] || null;
  },
};

module.exports = livrosRep;
