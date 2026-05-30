import Link from 'next/link';

const TESTAMENT_NAMES = { AT: 'Antigo Testamento', NT: 'Novo Testamento' };

export default function BookCard({ nome, sigla, testamento, ordem }) {
  const isAT = testamento === 'AT';

  return (
    <Link href={`/livros/${sigla}`} className="card-link" aria-label={`Livro de ${nome}, ${TESTAMENT_NAMES[testamento]}`}>
      <article
        className="book-card card"
        style={{ borderLeftColor: isAT ? 'var(--olive)' : 'var(--blue-deep)' }}
      >
        <div className="book-card-header">
          <span className={`badge ${isAT ? 'badge-at' : 'badge-nt'}`} aria-label={TESTAMENT_NAMES[testamento]}>
            {testamento}
          </span>
          <span className="book-ordem" aria-hidden="true">#{ordem}</span>
        </div>
        <h3 className="book-name">{nome}</h3>
        <span className="book-sigla">{sigla}</span>
      </article>
    </Link>
  );
}
