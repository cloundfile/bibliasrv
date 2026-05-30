'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAccessibility } from './AccessibilityProvider';

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    fontLabel, increaseFont, decreaseFont, isMinFont, isMaxFont,
    modeLabel, modeNextAria, cycleMode,
  } = useAccessibility();

  function handleSearch(e) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/busca?q=${encodeURIComponent(q)}`);
      setSearchQuery('');
      setMenuOpen(false);
    }
  }

  return (
    <header className="header no-print" role="banner">
      <div className="container header-inner">
        <Link href="/" className="logo" aria-label="Bíblia Sagrada - Página inicial">
          <span className="logo-icon" aria-hidden="true">✝</span>
          <span className="logo-text">Bíblia Sagrada</span>
        </Link>

        <nav className={`nav ${menuOpen ? 'nav-open' : ''}`} role="navigation" aria-label="Navegação principal">
          <Link href="/livros/gn/1" className="nav-link" onClick={() => setMenuOpen(false)}>
            Leitura
          </Link>
          <Link href="/livros" className="nav-link" onClick={() => setMenuOpen(false)}>
            Livros
          </Link>
          <Link href="/busca" className="nav-link" onClick={() => setMenuOpen(false)}>
            Busca
          </Link>
          <Link href="/oracao" className="nav-link" onClick={() => setMenuOpen(false)}>
            Oração
          </Link>
          <Link href="/contribuir" className="nav-link" onClick={() => setMenuOpen(false)}>
            Contribuir
          </Link>

          <form className="nav-search" onSubmit={handleSearch} role="search" aria-label="Buscar na Bíblia">
            <label htmlFor="nav-search-input" className="sr-only">Buscar na Bíblia</label>
            <input
              id="nav-search-input"
              type="search"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Termo de busca"
            />
            <button type="submit" className="search-btn" aria-label="Buscar">
              🔍
            </button>
          </form>
        </nav>

        <div className="accessibility-controls" role="toolbar" aria-label="Controles de acessibilidade">
          <button
            onClick={decreaseFont}
            disabled={isMinFont}
            className="a11y-btn"
            aria-label="Diminuir tamanho da fonte"
            title="Diminuir fonte"
          >
            A<sup>-</sup>
          </button>
          <span className="font-size-indicator" aria-live="polite" aria-label={`Fonte: ${fontLabel}`}>
            {fontLabel}
          </span>
          <button
            onClick={increaseFont}
            disabled={isMaxFont}
            className="a11y-btn"
            aria-label="Aumentar tamanho da fonte"
            title="Aumentar fonte"
          >
            A<sup>+</sup>
          </button>
          <button
            onClick={cycleMode}
            className="a11y-btn mode-btn"
            aria-label={modeNextAria}
            title={`Modo: ${modeLabel}`}
          >
            <span aria-hidden="true">{modeLabel === 'Claro' ? 'C' : modeLabel === 'Escuro' ? 'E' : 'AC'}</span>
          </button>
        </div>

        <button
          className={`hamburger ${menuOpen ? 'hamburger-active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>
    </header>
  );
}
