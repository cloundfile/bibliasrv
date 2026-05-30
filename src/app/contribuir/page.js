import Link from 'next/link';

export default function ContribuirPage() {
  return (
    <div style={{ paddingBottom: '4rem' }}>
      <section className="give-hero-section">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Você está aqui" style={{ marginBottom: '0', justifyContent: 'center' }}>
            <Link href="/">Início</Link>
            <span className="separator" aria-hidden="true">›</span>
            <span className="current">Contribuir</span>
          </nav>

          <div className="give-hero-content">
            <span className="give-hero-cross" aria-hidden="true">✝</span>
            <h1 className="give-hero-title">Semeie a Palavra</h1>
            <p className="give-hero-sub">
              A sua contribuição mantém este ministério vivo e leva as Escrituras a quem precisa.
            </p>
            <blockquote className="give-hero-verse">
              <p>&ldquo;Deus ama ao que dá com alegria.&rdquo;</p>
              <cite>2 Coríntios 9:7</cite>
            </blockquote>
          </div>
        </div>
        <div className="give-hero-divider" aria-hidden="true" />
      </section>

      <div className="container">
        <section className="give-values-section" aria-label="Sugestões de contribuição">
          <h2 className="give-section-label">Escolha seu valor</h2>
          <div className="give-values-grid">
            <a href="https://livepix.gg/ofertacrista" target="_blank" rel="noopener noreferrer" className="give-value-card" style={{ '--card-accent': 'var(--gold)' }}>
              <span className="give-value-icon">🙏</span>
              <span className="give-value-label">Agradecimento</span>
              <strong className="give-value-amount">R$ 20</strong>
            </a>
            <a href="https://livepix.gg/ofertacrista" target="_blank" rel="noopener noreferrer" className="give-value-card" style={{ '--card-accent': 'var(--gold)' }}>
              <span className="give-value-icon">🕊️</span>
              <span className="give-value-label">Oração</span>
              <strong className="give-value-amount">R$ 50</strong>
            </a>
            <a href="https://livepix.gg/ofertacrista" target="_blank" rel="noopener noreferrer" className="give-value-card" style={{ '--card-accent': 'var(--gold)' }}>
              <span className="give-value-icon">✨</span>
              <span className="give-value-label">Oferta</span>
              <strong className="give-value-amount">R$ 100</strong>
            </a>
            <a href="https://livepix.gg/ofertacrista" target="_blank" rel="noopener noreferrer" className="give-value-card give-value-card--primary" style={{ '--card-accent': '#D4A534' }}>
              <span className="give-value-badge">Recomendado</span>
              <span className="give-value-icon">💛</span>
              <span className="give-value-label">Dízimo</span>
              <strong className="give-value-amount">R$ 200</strong>
            </a>
            <a href="https://livepix.gg/ofertacrista" target="_blank" rel="noopener noreferrer" className="give-value-card" style={{ '--card-accent': 'var(--gold)' }}>
              <span className="give-value-icon">💝</span>
              <span className="give-value-label">Livre</span>
              <strong className="give-value-amount">Outro valor</strong>
            </a>
          </div>
          <p className="give-values-footnote">
            Não há valor mínimo ou máximo. Contribua segundo propôs no seu coração.
          </p>
        </section>

        <section className="give-verse-closing" aria-label="Versículo de encerramento">
          <span className="give-closing-icon" aria-hidden="true">✝</span>
          <blockquote className="give-closing-verse">
            <p>
              &ldquo;Trazei todos os dízimos à casa do tesouro, para que haja mantimento na minha casa, e depois fazei prova de mim nisto, diz o Senhor dos Exércitos, se eu não vos abrir as janelas do céu e não derramar sobre vós uma bênção tal até que não haja lugar suficiente para a recolherdes.&rdquo;
            </p>
            <cite>Malaquias 3:10</cite>
          </blockquote>
        </section>
      </div>
    </div>
  );
}
