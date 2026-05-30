'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function OracaoPage() {
  const [form, setForm] = useState({ nome: '', email: '', pedido: '', consentimento: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [pedidos, setPedidos] = useState([]);
  const [pedidosLoading, setPedidosLoading] = useState(true);
  const listRef = useRef(null);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch('/api/oracao');
        const data = await res.json();
        if (data.success) setPedidos(data.data);
      } catch {
        /* silencioso */
      } finally {
        setPedidosLoading(false);
      }
    }
    carregar();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/oracao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          pedido: form.pedido,
          consentimento: form.consentimento,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Erro ao enviar pedido');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setLoading(false);
      setForm({ nome: '', email: '', pedido: '', consentimento: false });

      const res2 = await fetch('/api/oracao');
      const data2 = await res2.json();
      if (data2.success) setPedidos(data2.data);

      listRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch {
      setError('Erro de conexão. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <nav className="breadcrumbs" aria-label="Você está aqui">
        <Link href="/">Início</Link>
        <span className="separator" aria-hidden="true">›</span>
        <span className="current">Pedidos de Oração</span>
      </nav>

      <section className="prayer-hero">
        <h1 className="section-title">Pedidos de Oração</h1>
        <blockquote className="prayer-hero-verse">
          <p>
            &ldquo;Confessai as vossas culpas uns aos outros e orai uns pelos outros, para que sareis. A oração feita por um justo pode muito nos seus efeitos.&rdquo;
          </p>
          <cite className="give-verse-ref">Tiago 5:16</cite>
        </blockquote>
        <p className="prayer-hero-desc">
          Compartilhe seu pedido e interceda pelos irmãos.
        </p>
      </section>

      {success && (
        <div className="prayer-success-banner" role="status">
          <span aria-hidden="true">🙏</span>
          <span>Pedido recebido! Nossa equipe estará orando por você.</span>
        </div>
      )}

      <div className="prayer-layout">
        <div className="prayer-form-col">
          <div className="prayer-form-card">
            <h2 className="prayer-form-title">Enviar Pedido</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="prayer-form-group">
                <label htmlFor="nome" className="prayer-label">Nome</label>
                <input
                  id="nome" name="nome" type="text" className="prayer-input"
                  value={form.nome} onChange={handleChange}
                  required aria-required="true"
                />
              </div>

              <div className="prayer-form-group">
                <label htmlFor="email" className="prayer-label">E-mail</label>
                <input
                  id="email" name="email" type="email" className="prayer-input"
                  value={form.email} onChange={handleChange}
                  required aria-required="true"
                />
              </div>

              <div className="prayer-form-group">
                <label htmlFor="pedido" className="prayer-label">Seu Pedido</label>
                <textarea
                  id="pedido" name="pedido" className="prayer-textarea"
                  value={form.pedido} onChange={handleChange}
                  maxLength={500} required aria-required="true"
                />
              </div>

              <div className="prayer-checkbox-group">
                <input
                  id="consentimento" name="consentimento" type="checkbox"
                  className="prayer-checkbox"
                  checked={form.consentimento} onChange={handleChange}
                  required aria-required="true"
                />
                <label htmlFor="consentimento" className="prayer-checkbox-label">
                  Autorizo o compartilhamento com a equipe de oração
                </label>
              </div>

              {error && <div className="prayer-error" role="alert">{error}</div>}

              <button type="submit" className="btn btn-primary prayer-submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar Pedido'}
              </button>
            </form>
          </div>
        </div>

        <div className="prayer-list-col" ref={listRef}>
          <h2 className="prayer-list-title">
            Pedidos Recentes
            <span className="prayer-count">{pedidos.length}</span>
          </h2>

          {pedidosLoading && (
            <div className="prayer-loading" aria-live="polite">Carregando...</div>
          )}

          {!pedidosLoading && pedidos.length === 0 && (
            <div className="prayer-empty">
              Nenhum pedido compartilhado ainda. Seja o primeiro!
            </div>
          )}

          {!pedidosLoading && pedidos.length > 0 && (
            <div className="pedidos-list">
              {pedidos.map((p) => (
                <div key={p.id} className="pedido-card">
                  <div className="pedido-header">
                    <span className="pedido-nome">{p.nome}</span>
                    <span className="pedido-data">
                      {new Date(p.criado_em).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="pedido-texto">{p.pedido}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
