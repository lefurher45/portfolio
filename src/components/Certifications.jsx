import { useState } from 'react'
import certifications from '../data/certifications.json'
import Reveal from './Reveal'
import badge from '../assets/cisco1.png'

export default function Certifications() {
  const [open, setOpen] = useState(null)

  return (
    <section id="certifications">
      <div className="container">
        <Reveal><span className="label">Certifications</span></Reveal>
        <Reveal delay={60}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '14px 0 40px' }}>
            Badges obtenus
          </h2>
        </Reveal>

        <div className="cert-grid">
          {certifications.map((c, i) => (
            <Reveal key={c.id} delay={i * 80}>
              <button className="cert-card" onClick={() => setOpen(c)}>
                <div className="cert-badge">
                  {c.badge ? <img src={c.badge} alt={c.title} /> : <span className="label">Badge</span>}
                </div>
                <div>
                  <div style={{ fontWeight: 700 }}>{c.title}</div>
                  <div className="label" style={{ marginTop: 4, color: 'var(--label-neutral)' }}>{c.issuer} · {c.date}</div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open && (
        <div className="cert-modal-backdrop" onClick={() => setOpen(null)}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setOpen(null)} aria-label="Fermer">×</button>
            {open.badge && <img src={open.badge} alt={open.title} className="cert-modal-badge" />}
            <h3 style={{ marginBottom: 4 }}>{open.title}</h3>
            <p className="label" style={{ marginBottom: 18 }}>{open.issuer} · {open.date}</p>
            <ul style={{ paddingLeft: 18, color: 'var(--text-on-light-secondary)', lineHeight: 1.8 }}>
              {open.topics.map((t) => <li key={t}>{t}</li>)}
            </ul>
            {open.verifyUrl && (
              <a href={open.verifyUrl} target="_blank" rel="noreferrer" className="btn" style={{ background: '#0A0A0A', color: '#fff', marginTop: 16 }}>
                Vérifier le badge
              </a>
            )}
          </div>
        </div>
      )}

      <style>{`
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 18px;
        }
        .cert-card {
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
          background: transparent;
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-md);
          padding: 18px;
          cursor: pointer;
          color: #fff;
          font-family: var(--font-body);
          transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .cert-card:hover { border-color: #fff; transform: translateY(-2px); }
        .cert-badge {
          width: 56px; height: 56px;
          border: 1px solid var(--border-dark);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cert-badge img { width: 100%; height: 100%; object-fit: cover; }
        .cert-modal-backdrop {
          position: fixed; inset: 0; background: rgba(10,10,10,0.85);
          display: flex; align-items: center; justify-content: center;
          z-index: 100; padding: 24px;
        }
        .cert-modal {
          background: var(--bg-card);
          color: var(--text-on-light);
          border-radius: var(--radius-lg);
          padding: 32px;
          max-width: 420px;
          width: 100%;
          position: relative;
        }
        .cert-modal-badge { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; margin-bottom: 16px; }
        .cert-modal-close {
          position: absolute; top: 16px; right: 16px;
          background: none; border: none; font-size: 24px; cursor: pointer; color: var(--text-on-light);
        }
      `}</style>
    </section>
  )
}
