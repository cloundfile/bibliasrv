export default function VerseDisplay({ numero, texto, isSelected, onToggleClick, chapterNum }) {
  return (
    <div
      className={`verse ${isSelected ? 'verse-selected' : ''}`}
      id={`v${numero}`}
      onClick={() => onToggleClick(chapterNum, numero)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggleClick(chapterNum, numero); }}
    >
      <span className="verse-number" aria-label={`Versículo ${numero}`}>{numero}</span>
      <span className="verse-text">{texto}</span>
    </div>
  );
}
