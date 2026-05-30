import Link from 'next/link';
import { headers } from 'next/headers';
import SearchBar from '@/components/SearchBar';

async function searchVerses(query) {
  if (!query || query.trim().length === 0) return [];
  try {
    const h = await headers();
    const host = h.get('host') || 'localhost:3000';
    const protocol = host === 'localhost:3000' ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    const res = await fetch(`${baseUrl}/api/busca?q=${encodeURIComponent(query.trim())}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export default async function BuscaPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || '';
  const results = query ? await searchVerses(query) : [];

  const hasQuery = query.length > 0;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <nav className="breadcrumbs" aria-label="Você está aqui">
        <Link href="/">Início</Link>
        <span className="separator" aria-hidden="true">›</span>
        <span className="current">Busca</span>
      </nav>

      <h1 className="section-title">Busca na Bíblia</h1>
      <p className="page-description">
        Encontre versículos por palavra ou frase em toda a Bíblia.
      </p>

      <section className="search-section">
        <SearchBar initialQuery={query} />
      </section>

      {hasQuery && (
        <section aria-label="Resultados da busca" style={{ marginTop: '2.5rem' }}>
          <h2 className="results-heading">
            {results.length > 0
              ? `${results.length} resultado${results.length !== 1 ? 's' : ''} para "${query}"`
              : `Nenhum resultado encontrado para "${query}"`}
          </h2>

          {results.length > 0 ? (
            <div className="results-list">
              {results.map((r, idx) => (
                <Link
                  key={`${r.livro_sigla}-${r.capitulo_numero}-${r.versiculo_numero}-${idx}`}
                  href={`/livros/${r.livro_sigla}/${r.capitulo_numero}?v=${r.versiculo_numero}`}
                  className="result-card card card-link"
                >
                  <div className="result-ref">
                    {r.livro_nome} {r.capitulo_numero}:{r.versiculo_numero}
                  </div>
                  <p className="result-text">
                    &ldquo;{r.versiculo_texto}&rdquo;
                  </p>
                  <span className="result-goto">
                    Ir para o capítulo →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>Tente buscar com outras palavras ou verifique a ortografia.</p>
            </div>
          )}
        </section>
      )}

      {!hasQuery && (
        <section className="search-tips" aria-label="Dicas de busca">
          <h3 className="tips-title">Dicas de busca</h3>
          <ul className="tips-list">
            <li>Busque por palavras como <strong>amor</strong>, <strong>fé</strong>, <strong>esperança</strong></li>
            <li>Busque por frases como <strong>No princípio</strong></li>
            <li>Busque por nomes como <strong>Jesus</strong>, <strong>Moisés</strong>, <strong>Davi</strong></li>
          </ul>
        </section>
      )}
    </div>
  );
}
