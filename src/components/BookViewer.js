'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import VerseDisplay from './VerseDisplay';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function BookViewer({ sigla, leftChapter: initialLeft, rightChapter: initialRight, totalChapters, highlightVerse, highlightChapter }) {
  const [left, setLeft] = useState(initialLeft);
  const [right, setRight] = useState(initialRight);
  const [leftChapterNum, setLeftChapterNum] = useState(initialLeft?.capitulo ?? 1);
  const [rightChapterNum, setRightChapterNum] = useState(initialRight?.capitulo ?? null);
  const [phase, setPhase] = useState('idle');
  const [direction, setDirection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [picker, setPicker] = useState(null);
  const [jumping, setJumping] = useState(false);
  const pickerRef = useRef(null);
  const mounted = useRef(true);
  const busy = useRef(false);

  const [selectedVerses, setSelectedVerses] = useState(() => {
    if (highlightVerse) {
      return new Set([`${highlightChapter}-${highlightVerse}`]);
    }
    return new Set();
  });

  const toggleVerse = useCallback((chapterNum, verseNum) => {
    setSelectedVerses(prev => {
      const key = `${chapterNum}-${verseNum}`;
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    function handleClick(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setPicker(null);
      }
    }
    if (picker) document.addEventListener('mousedown', handleClick);
    return () => {
      mounted.current = false;
      document.removeEventListener('mousedown', handleClick);
    };
  }, [picker]);

  useEffect(() => {
    if (!highlightVerse) return;
    const timer = setTimeout(() => {
      const el = document.querySelector(`[data-verse-id="${highlightChapter}-${highlightVerse}"]`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
    return () => clearTimeout(timer);
  }, [highlightVerse, highlightChapter, left, right]);

  const fetchChapter = useCallback(async (chapterNum) => {
    if (chapterNum == null || chapterNum < 1 || chapterNum > totalChapters) return null;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const res = await fetch(`${baseUrl}/api/livros/${sigla}/${chapterNum}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? json.data : null;
  }, [sigla, totalChapters]);

  const reset = useCallback(() => {
    setPhase('idle');
    setDirection(null);
    setLoading(false);
    busy.current = false;
  }, []);

  const goToChapter = useCallback(async (target) => {
    if (busy.current || target === leftChapterNum) { setPicker(null); return; }
    const newLeft = target % 2 === 1 ? target : target - 1;
    if (newLeft < 1 || newLeft > totalChapters) { setPicker(null); return; }
    busy.current = true;
    setPicker(null);
    setDirection(newLeft > leftChapterNum ? 'next' : 'prev');
    setPhase('closing');
    setJumping(true);

    await sleep(400);
    if (!mounted.current) { busy.current = false; setJumping(false); return; }
    setLoading(true);

    try {
      const [dataLeft, dataRight] = await Promise.all([
        fetchChapter(newLeft),
        fetchChapter(newLeft + 1),
      ]);
      if (!mounted.current) { busy.current = false; setJumping(false); return; }
      setLeft(dataLeft || left);
      setLeftChapterNum(newLeft);
      setRight(dataRight || null);
      setRightChapterNum(dataRight ? newLeft + 1 : null);
      setLoading(false);
      setPhase('opening');
      setJumping(false);

      await sleep(400);
      if (!mounted.current) { busy.current = false; return; }
      reset();
    } catch {
      reset();
      setJumping(false);
    }
  }, [leftChapterNum, totalChapters, fetchChapter, reset, left]);

  const turnPage = useCallback(async (dir) => {
    if (busy.current) return;
    busy.current = true;

    setDirection(dir);
    setPhase('closing');

    await sleep(400);

    if (!mounted.current) { busy.current = false; return; }
    setLoading(true);

    const newLeftChapter = dir === 'next' ? leftChapterNum + 2 : leftChapterNum - 2;

    if (newLeftChapter < 1 || newLeftChapter > totalChapters) {
      reset();
      return;
    }

    try {
      const [dataLeft, dataRight] = await Promise.all([
        fetchChapter(newLeftChapter),
        fetchChapter(newLeftChapter + 1),
      ]);
      if (!mounted.current) { busy.current = false; return; }
      setLeft(dataLeft || left);
      setLeftChapterNum(newLeftChapter);
      setRight(dataRight || null);
      setRightChapterNum(dataRight ? newLeftChapter + 1 : null);

      setLoading(false);
      setPhase('opening');

      await sleep(400);
      if (!mounted.current) { busy.current = false; return; }
      reset();
    } catch {
      reset();
    }
  }, [leftChapterNum, totalChapters, fetchChapter, reset, left]);

  const flipping = phase !== 'idle';
  const hasPrev = leftChapterNum > 1;
  const hasNext = leftChapterNum + 1 < totalChapters;

  if (!left) {
    return <p className="empty-msg">Capítulo não encontrado.</p>;
  }

  const containerClass = phase !== 'idle'
    ? `book-container book-${direction} book-${phase}`
    : 'book-container';

  return (
    <div className="book-wrapper">
      <div className={containerClass}>
        <div className="book-spine" aria-hidden="true" />
        <div className="book-page book-page-left">
          <div className="book-page-content">
            <div className="book-chapter-title-wrap">
              <button
                className="book-chapter-btn"
                onClick={() => setPicker(picker === 'left' ? null : 'left')}
                disabled={jumping}
              >
                {left.livro} {leftChapterNum}
              </button>
              {picker === 'left' && (
                <div className="chapter-picker" ref={pickerRef}>
                  {Array.from({ length: totalChapters }, (_, i) => i + 1).map(n => (
                    <button
                      key={n}
                      className={`chapter-pick-item ${n === leftChapterNum ? 'chapter-pick-active' : ''}`}
                      onClick={() => goToChapter(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="book-verses">
              {left.versiculos?.length > 0 ? left.versiculos.map(v => (
                <div key={v.numero} data-verse-id={`${leftChapterNum}-${v.numero}`}>
                  <VerseDisplay
                    numero={v.numero}
                    texto={v.texto}
                    isSelected={selectedVerses.has(`${leftChapterNum}-${v.numero}`)}
                    onToggleClick={toggleVerse}
                    chapterNum={leftChapterNum}
                  />
                </div>
              )) : (
                <p className="empty-msg">Nenhum versículo encontrado.</p>
              )}
            </div>
          </div>
        </div>
        <div className="book-page book-page-right">
          <div className="book-page-content">
            {right ? (
              <>
                <div className="book-chapter-title-wrap">
                  <button
                    className="book-chapter-btn"
                    onClick={() => setPicker(picker === 'right' ? null : 'right')}
                    disabled={jumping}
                  >
                    {right.livro} {rightChapterNum}
                  </button>
                  {picker === 'right' && (
                    <div className="chapter-picker" ref={pickerRef}>
                      {Array.from({ length: totalChapters }, (_, i) => i + 1).map(n => (
                        <button
                          key={n}
                          className={`chapter-pick-item ${n === rightChapterNum ? 'chapter-pick-active' : ''}`}
                          onClick={() => goToChapter(n)}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="book-verses">
                  {right.versiculos?.length > 0 ? right.versiculos.map(v => (
                    <div key={v.numero} data-verse-id={`${rightChapterNum}-${v.numero}`}>
                      <VerseDisplay
                        numero={v.numero}
                        texto={v.texto}
                        isSelected={selectedVerses.has(`${rightChapterNum}-${v.numero}`)}
                        onToggleClick={toggleVerse}
                        chapterNum={rightChapterNum}
                      />
                    </div>
                  )) : (
                    <p className="empty-msg">Nenhum versículo encontrado.</p>
                  )}
                </div>
              </>
            ) : (
              <div className="book-page-empty">
                <p>Fim do livro</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="chapter-nav no-print" aria-label="Navegação entre capítulos">
        <div className="chapter-nav-inner">
          {hasPrev ? (
            <button
              onClick={() => turnPage('prev')}
              className="btn btn-secondary nav-btn"
              disabled={phase !== 'idle'}
              aria-label="Capítulos anteriores"
            >
              <span aria-hidden="true">←</span> Anterior
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={() => turnPage('next')}
            className="btn btn-primary nav-btn"
            disabled={!hasNext || flipping}
            aria-label="Próximos capítulos"
          >
            {flipping ? <span className="nav-flipping">Virando...</span> : <>Próximo <span aria-hidden="true">→</span></>}
          </button>
        </div>
      </nav>
    </div>
  );
}
