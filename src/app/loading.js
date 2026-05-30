export default function Loading() {
  return (
    <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div className="loading-spinner" role="status" aria-label="Carregando">
        <div className="spinner" aria-hidden="true" />
        <p>Carregando...</p>
      </div>
    </div>
  );
}
