import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container">
      <div className="not-found-page">
        <h1>Página não encontrada</h1>
        <p>
          A página que você procura não existe ou foi removida.
          Verifique o endereço ou navegue pelos livros da Bíblia.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" className="btn btn-primary">
            Página Inicial
          </Link>
          <Link href="/livros" className="btn btn-secondary">
            Livros
          </Link>
        </div>
      </div>
    </div>
  );
}
