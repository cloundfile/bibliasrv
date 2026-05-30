'use client';

export default function Error({ error, reset }) {
  return (
    <div className="container">
      <div className="error-page">
        <h1>Algo deu errado</h1>
        <p>
          Ocorreu um erro ao carregar esta página. Tente novamente ou volte para a página inicial.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={reset} className="btn btn-primary">
            Tentar novamente
          </button>
          <a href="/" className="btn btn-secondary">
            Página Inicial
          </a>
        </div>
      </div>
    </div>
  );
}
