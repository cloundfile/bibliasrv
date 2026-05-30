-- Criação da tabela de pedidos de oração
-- Executar no Oracle Autonomous Database

CREATE TABLE pedidos_oracao (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR2(200) NOT NULL,
    email VARCHAR2(200) NOT NULL,
    pedido VARCHAR2(500) NOT NULL,
    consentimento NUMBER(1) DEFAULT 1 NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para ordenação por data
CREATE INDEX idx_pedidos_oracao_data ON pedidos_oracao(criado_em DESC);

-- Permissões (se necessário)
-- GRANT INSERT, SELECT ON pedidos_oracao TO biblia;
