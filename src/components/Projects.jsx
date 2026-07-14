import { useState } from 'react'
import projects from '../data/projects.json'
import Reveal from './Reveal'
export default function Projects() {
  const [open, setOpen] = useState(null)

  return (
    <section id="projets">
      <div className="container">
        <Reveal><span className="label">Projets</span></Reveal>
        <Reveal delay={60}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '14px 0 40px' }}>
            Réalisations
          </h2>
        </Reveal>

        <div className="proj-grid">
          {projects.map((p, i) => (
            <Reveal key={p.id || i} delay={i * 90}>
              <button className="proj-card" onClick={() => setOpen(p)}>
                <div className="proj-thumb">
                  {p.images && p.images.length > 0
                    ? <img src={p.images[0]} alt={p.title} />
                    : <span className="label">Aperçu à venir</span>}
                </div>
                <div style={{ padding: '16px 4px 0' }}>
                  <div style={{ fontWeight: 700 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-on-dark-secondary)', marginTop: 4 }}>{p.summary}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                    {p.tags?.map((t) => (
                      <span key={t} className="label" style={{ border: '1px solid var(--border-dark)', borderRadius: 999, padding: '4px 10px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {open && (
        <div className="proj-modal-backdrop" onClick={() => setOpen(null)}>
          <div className="proj-modal" onClick={(e) => e.stopPropagation()}>
            <button className="proj-modal-close" onClick={() => setOpen(null)} aria-label="Fermer">×</button>
            
            <h3 style={{ marginBottom: 6 }}>{open.title}</h3>
            <p className="label" style={{ marginBottom: 18 }}>{open.date}</p>
            
            {/* Galerie d'images */}
            {open.images && open.images.length > 0 && (
              <div className="proj-gallery">
                {open.images.map((img, idx) => (
                  <img key={`${open.id}-${idx}`} src={img} alt={`${open.title} - image ${idx + 1}`} />
                ))}
              </div>
            )}

            <p style={{ color: 'var(--text-on-light-secondary)', lineHeight: 1.8, marginTop: 16 }}>
              {open.description}
            </p>
            
            {open.referenceUrl && (
              <a href={open.referenceUrl} target="_blank" rel="noreferrer" className="btn" style={{ display: 'inline-block', background: '#0A0A0A', color: '#fff', marginTop: 20, padding: '10px 20px', borderRadius: '8px', textDecoration: 'none' }}>
                Voir la référence
              </a>
            )}
          </div>
        </div>
      )}

      <style>{`
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        .proj-card {
          text-align: left;
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          color: #fff;
          font-family: var(--font-body);
        }
        .proj-thumb {
          aspect-ratio: 4/3;
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          transition: border-color 0.15s ease;
        }
        .proj-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .proj-card:hover .proj-thumb { border-color: #fff; }
        
        .proj-modal-backdrop {
          position: fixed; inset: 0; background: rgba(10,10,10,0.85);
          display: flex; align-items: center; justify-content: center;
          z-index: 100; padding: 24px; overflow-y: auto;
        }
        .proj-modal {
          background: #fff; /* Assuré que le fond est clair pour le modal */
          color: #1a1a1a;
          border-radius: var(--radius-lg);
          padding: 32px;
          max-width: 700px;
          width: 100%;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }
        .proj-modal-close {
          position: absolute; top: 16px; right: 16px;
          background: none; border: none; font-size: 28px; cursor: pointer; color: #1a1a1a;
        }
        
        /* Correction de la galerie */
        .proj-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-top: 16px;
        }
        .proj-gallery img { 
          width: 100%; 
          height: 180px; 
          object-fit: cover; 
          border-radius: 8px;
          border: 1px solid #eee;
        }
      `}</style>
    </section>
  )
}