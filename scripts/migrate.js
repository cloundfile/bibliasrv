require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
const { execute, closePool } = require('../src/config/database');

async function run() {
  console.log('Criando tabela pedidos_oracao...');

  try {
    await execute(
      `BEGIN
        EXECUTE IMMEDIATE 'CREATE TABLE pedidos_oracao (
          id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
          nome VARCHAR2(200) NOT NULL,
          email VARCHAR2(200) NOT NULL,
          pedido VARCHAR2(500) NOT NULL,
          consentimento NUMBER(1) DEFAULT 1 NOT NULL,
          criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )';
        EXECUTE IMMEDIATE 'CREATE INDEX idx_pedidos_oracao_data ON pedidos_oracao(criado_em DESC)';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE = -955 THEN
            NULL;
          ELSE
            RAISE;
          END IF;
      END;`,
      [],
      { autoCommit: true }
    );
    console.log('Tabela pedidos_oracao criada com sucesso!');
  } catch (err) {
    console.error('Erro ao criar tabela:', err.message);
    process.exit(1);
  } finally {
    await closePool();
  }
}

run();
