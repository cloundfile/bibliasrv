import Link from 'next/link';
import { headers } from 'next/headers';
import BookCard from '@/components/BookCard';

async function getBooks() {
  try {
    const h = await headers();
    const host = h.get('host') || 'localhost:3000';
    const protocol = host === 'localhost:3000' ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    const res = await fetch(`${baseUrl}/api/livros`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch books');
    const json = await res.json();
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export default async function LivrosPage() {
  const books = await getBooks();

  const atBooks = books.filter(b => b.testamento === 'AT');
  const ntBooks = books.filter(b => b.testamento === 'NT');

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <nav className="breadcrumbs" aria-label="Você está aqui">
        <Link href="/">Início</Link>
        <span className="separator" aria-hidden="true">›</span>
        <span className="current">Livros</span>
      </nav>

      <h1 className="section-title">Livros da Bíblia</h1>
      <p className="page-description">
        Selecione um livro para começar a leitura.
      </p>

      <section aria-label="Antigo Testamento" style={{ marginBottom: '3rem' }}>
        <h2 className="testament-title">Antigo Testamento</h2>
        <div className="books-grid">
          {atBooks.length > 0 ? atBooks.map(book => (
            <BookCard key={book.sigla} {...book} />
          )) : (
            <p className="empty-msg">Nenhum livro encontrado.</p>
          )}
        </div>
      </section>

      <section aria-label="Novo Testamento">
        <h2 className="testament-title">Novo Testamento</h2>
        <div className="books-grid">
          {ntBooks.length > 0 ? ntBooks.map(book => (
            <BookCard key={book.sigla} {...book} />
          )) : (
            <p className="empty-msg">Nenhum livro encontrado.</p>
          )}
        </div>
      </section>
    </div>
  );
}
