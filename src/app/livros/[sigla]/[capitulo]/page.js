import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookViewer from '@/components/BookViewer';
import versiculosService from '@/services/versiculosService';
import capitulosService from '@/services/capitulosService';

async function getChapter(sigla, capitulo) {
  try {
    return await versiculosService.listarPorCapitulo(sigla, capitulo);
  } catch {
    return null;
  }
}

async function getTotalChapters(sigla) {
  try {
    const data = await capitulosService.listarPorSigla(sigla);
    return data.capitulos?.length || 0;
  } catch {
    return 0;
  }
}

export default async function ChapterPage({ params, searchParams }) {
  const { sigla, capitulo } = await params;
  const chapterNum = parseInt(capitulo, 10);

  const [chapter, totalChapters] = await Promise.all([
    getChapter(sigla, chapterNum),
    getTotalChapters(sigla),
  ]);

  if (!chapter) {
    notFound();
  }

  const bookName = chapter.livro;
  const sp = await searchParams;
  const highlightVerse = sp?.v ? parseInt(sp.v, 10) : null;

  let leftData, rightData, leftNum, rightNum;

  if (chapterNum % 2 === 1) {
    leftData = chapter;
    leftNum = chapterNum;
    const nextChapterNum = chapterNum + 1;
    if (nextChapterNum <= totalChapters) {
      const next = await getChapter(sigla, nextChapterNum);
      rightData = next;
      rightNum = nextChapterNum;
    } else {
      rightData = null;
      rightNum = null;
    }
  } else {
    const prev = await getChapter(sigla, chapterNum - 1);
    leftData = prev;
    leftNum = chapterNum - 1;
    rightData = chapter;
    rightNum = chapterNum;
  }

  const bookChapterData = leftData ? {
    livro: leftData.livro,
    sigla,
    capitulo: leftNum,
    versiculos: leftData.versiculos || [],
  } : null;

  const bookNextData = rightData ? {
    livro: rightData.livro,
    sigla,
    capitulo: rightNum,
    versiculos: rightData.versiculos || [],
  } : null;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <nav className="breadcrumbs" aria-label="Você está aqui">
        <Link href="/">Início</Link>
        <span className="separator" aria-hidden="true">›</span>
        <Link href="/livros">Livros</Link>
        <span className="separator" aria-hidden="true">›</span>
        <Link href={`/livros/${sigla}`}>{bookName}</Link>
        <span className="separator" aria-hidden="true">›</span>
        <span className="current">
          Capítulo {leftNum}{rightNum ? `-${rightNum}` : ''}
        </span>
      </nav>

      <BookViewer
        sigla={sigla}
        leftChapter={bookChapterData}
        rightChapter={bookNextData}
        totalChapters={totalChapters}
        highlightVerse={highlightVerse}
        highlightChapter={chapterNum}
      />
    </div>
  );
}
