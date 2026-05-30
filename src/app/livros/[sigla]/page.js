import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getBook(sigla) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/livros/${sigla}`, { next: { revalidate: 3600 } });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch book');
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export default async function BookPage({ params }) {
  const { sigla } = await params;
  const book = await getBook(sigla);

  if (!book) {
    notFound();
  }

  const totalChapters = book.capitulos?.length || 0;
  const isAT = book.testamento === 'AT';

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <nav className="breadcrumbs" aria-label="Você está aqui">
        <Link href="/">Início</Link>
        <span className="separator" aria-hidden="true">›</span>
        <Link href="/livros">Livros</Link>
        <span className="separator" aria-hidden="true">›</span>
        <span className="current">{book.nome}</span>
      </nav>

      <div className="book-header">
        <div className="book-info">
          <span className={`book-testament ${isAT ? 'book-testament--at' : 'book-testament--nt'}`}>
            {isAT ? 'Antigo Testamento' : 'Novo Testamento'}
          </span>
          <h1 className="book-title">{book.nome}</h1>
          <p className="book-meta">
            Sigla: <code>{book.sigla}</code>
            <span className="meta-sep" aria-hidden="true">|</span>
            {totalChapters} capítulo{totalChapters !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <section aria-label="Capítulos">
        <h2 className="section-title">Capítulos</h2>
        <div className="chapters-grid">
          {book.capitulos.map(ch => (
            <Link
              key={ch.numero}
              href={`/livros/${sigla}/${ch.numero}`}
              className="chapter-link"
              aria-label={`Capítulo ${ch.numero} de ${book.nome}`}
            >
              <span className="chapter-number">{ch.numero}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
