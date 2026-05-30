'use client';

import Link from 'next/link';

export default function ChapterNav({ sigla, currentChapter, totalChapters }) {
  const prev = currentChapter > 1 ? currentChapter - 1 : null;
  const next = currentChapter < totalChapters ? currentChapter + 1 : null;

  return (
    <nav className="chapter-nav no-print" aria-label="Navegação entre capítulos">
      <div className="chapter-nav-inner">
        {prev ? (
          <Link
            href={`/livros/${sigla}/${prev}`}
            className="btn btn-secondary nav-btn"
            aria-label={`Capítulo anterior: ${prev}`}
          >
            <span aria-hidden="true">←</span> Capítulo {prev}
          </Link>
        ) : (
          <div />
        )}

        <Link
          href={`/livros/${sigla}`}
          className="btn btn-secondary nav-btn"
          aria-label="Voltar para lista de capítulos"
        >
          Índice
        </Link>

        {next ? (
          <Link
            href={`/livros/${sigla}/${next}`}
            className="btn btn-primary nav-btn"
            aria-label={`Próximo capítulo: ${next}`}
          >
            Capítulo {next} <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
