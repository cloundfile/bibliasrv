const { execute } = require('@/config/database');

const versiculosRep = {
  async create(capituloId, numero, texto) {
    const result = await execute(
      `INSERT INTO versiculos (capitulo_id, numero, texto)
       VALUES (:1, :2, :3)`,
      [capituloId, numero, texto]
    );
    return result.lastRowid;
  },

  async getByCapituloId(capituloId) {
    const result = await execute(
      `SELECT * FROM versiculos WHERE capitulo_id = :1 ORDER BY numero ASC`,
      [capituloId]
    );
    return result.rows;
  },

  async getByReference(sigla, capitulo, versiculo) {
    const result = await execute(
      `SELECT
         v.numero AS versiculo_numero,
         v.texto AS versiculo_texto,
         c.numero AS capitulo_numero,
         l.nome AS livro_nome,
         l.sigla AS livro_sigla,
         l.testamento AS livro_testamento
       FROM versiculos v
       JOIN capitulos c ON v.capitulo_id = c.id
       JOIN livros l ON c.livro_id = l.id
       WHERE LOWER(l.sigla) = LOWER(:1)
         AND c.numero = :2
         AND v.numero = :3`,
      [sigla, capitulo, versiculo]
    );
    return result.rows[0] || null;
  },

  async getRandom() {
    const result = await execute(
      `SELECT
         v.numero AS versiculo_numero,
         v.texto AS versiculo_texto,
         c.numero AS capitulo_numero,
         l.nome AS livro_nome,
         l.sigla AS livro_sigla,
         l.testamento AS livro_testamento
       FROM versiculos v
       JOIN capitulos c ON v.capitulo_id = c.id
       JOIN livros l ON c.livro_id = l.id
       ORDER BY DBMS_RANDOM.VALUE
       FETCH FIRST 1 ROW ONLY`
    );
    return result.rows[0] || null;
  },

  async search(termo) {
    const result = await execute(
      `SELECT
         v.numero AS versiculo_numero,
         v.texto AS versiculo_texto,
         c.numero AS capitulo_numero,
         l.nome AS livro_nome,
         l.sigla AS livro_sigla
       FROM versiculos v
       JOIN capitulos c ON v.capitulo_id = c.id
       JOIN livros l ON c.livro_id = l.id
       WHERE LOWER(v.texto) LIKE LOWER(:1)
       ORDER BY l.ordem ASC, c.numero ASC, v.numero ASC
       FETCH FIRST 100 ROWS ONLY`,
      [`%${termo}%`]
    );
    return result.rows;
  },

  async getStats() {
    const result = await execute(
      `SELECT
         (SELECT COUNT(*) FROM livros) AS total_livros,
         (SELECT COUNT(*) FROM capitulos) AS total_capitulos,
         (SELECT COUNT(*) FROM versiculos) AS total_versiculos
       FROM DUAL`
    );
    return result.rows[0];
  },
};

module.exports = versiculosRep;
