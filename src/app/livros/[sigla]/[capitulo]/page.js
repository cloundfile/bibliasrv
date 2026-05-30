import Link from 'next/link';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import BookViewer from '@/components/BookViewer';

async function getChapter(sigla, capitulo) {
  try {
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = host === 'localhost:3000' ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;
    const res = await fetch(`${baseUrl}/api/livros/${sigla}/${capitulo}`, { next: { revalidate: 3600 } });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error('Failed to fetch chapter');
    const json = await res.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

async function getTotalChapters(sigla) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/livros/${sigla}`, { next: { revalidate: 3600 } });
    if (!res.ok) return 0;
    const json = await res.json();
    return json.success ? (json.data.capitulos?.length || 0) : 0;
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
