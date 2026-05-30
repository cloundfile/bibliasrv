import Link from 'next/link';

async function getVerseOfDay() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/versiculo-do-dia`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

async function getStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/status`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const [verse, stats] = await Promise.all([getVerseOfDay(), getStats()]);

  return (
    <>
      <section className="hero" aria-label="Destaque">
        <div className="container hero-content">
          <p className="hero-subtitle">Tradução Revisada e Corrigida</p>
          <h1 className="hero-title">Bíblia Sagrada</h1>

          <div className="hero-ornament" aria-hidden="true">
            <span className="hero-ornament-line" />
            <span className="hero-ornament-diamond" />
            <span className="hero-ornament-line" />
          </div>

          <div className="hero-actions">
            <Link href="/livros/gn/1" className="btn btn-primary btn-hero">
              Começar a Leitura
            </Link>
            <Link href="/livros" className="btn btn-hero-outline">
              Livros
            </Link>
            <Link href="/busca" className="btn btn-hero-outline">
              Buscar
            </Link>
          </div>

          {verse && (
            <div className="hero-verse-section">
              <div className="hero-verse-card">
                <span className="hero-verse-label">Versículo do Dia</span>
                <blockquote className="hero-verse-text">
                  &ldquo;{verse.texto}&rdquo;
                </blockquote>
                <cite className="hero-verse-ref">
                  {verse.livro} {verse.capitulo}:{verse.versiculo}
                </cite>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="quick-links-section" aria-label="Acesso rápido">
        <div className="container">
          <div className="quick-links-grid">
            <Link href="/livros/gn/1" className="quick-link-card card">
              <span className="quick-link-icon" aria-hidden="true">📖</span>
              <h3 className="quick-link-title">Leitura</h3>
              <p className="quick-link-desc">Comece a ler de Gênesis a Apocalipse</p>
            </Link>
            <Link href="/livros" className="quick-link-card card">
              <span className="quick-link-icon" aria-hidden="true">📚</span>
              <h3 className="quick-link-title">Livros</h3>
              <p className="quick-link-desc">Navegue por todos os 66 livros da Bíblia</p>
            </Link>
            <Link href="/busca" className="quick-link-card card">
              <span className="quick-link-icon" aria-hidden="true">🔍</span>
              <h3 className="quick-link-title">Busca</h3>
              <p className="quick-link-desc">Encontre versículos por palavra ou frase</p>
            </Link>
            <Link href="/contribuir" className="quick-link-card card">
              <span className="quick-link-icon" aria-hidden="true">🙏</span>
              <h3 className="quick-link-title">Contribuir</h3>
              <p className="quick-link-desc">Dízimo, oferta e contribuição</p>
            </Link>
            <Link href="/oracao" className="quick-link-card card">
              <span className="quick-link-icon" aria-hidden="true">🕊️</span>
              <h3 className="quick-link-title">Oração</h3>
              <p className="quick-link-desc">Envie seu pedido e interceda</p>
            </Link>
          </div>
        </div>
      </section>

      {stats && (
        <section className="stats-section" aria-label="Estatísticas da Bíblia">
          <div className="container">
            <h2 className="section-title" style={{ textAlign: 'center' }}>Estatísticas</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-number">{stats.total_livros}</span>
                <span className="stat-label">Livros</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{stats.total_capitulos}</span>
                <span className="stat-label">Capítulos</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">{stats.total_versiculos?.toLocaleString('pt-BR')}</span>
                <span className="stat-label">Versículos</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
