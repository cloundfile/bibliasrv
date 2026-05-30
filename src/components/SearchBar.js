'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchBar({ initialQuery }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery || '');

  useEffect(() => {
    setQuery(initialQuery || '');
  }, [initialQuery]);

  function handleSubmit(e) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      router.push(`/busca?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search" aria-label="Buscar na Bíblia">
      <label htmlFor="search-input" className="sr-only">Digite sua busca</label>
      <div className="search-wrapper">
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Digite uma palavra ou frase..."
          aria-label="Termo para buscar na Bíblia"
          className="search-input"
          autoFocus
        />
        <button type="submit" className="btn btn-primary search-submit" aria-label="Realizar busca">
          Buscar
        </button>
      </div>
    </form>
  );
}
