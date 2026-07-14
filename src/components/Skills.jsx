import { useState } from 'react'
import data from '../data/skills.json'
import Reveal from './Reveal'

export default function Skills() {
  const [active, setActive] = useState(null)

  return (
    <section id="competences">
      <div className="container">
        <Reveal><span className="label">Compétences</span></Reveal>
        <Reveal delay={60}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '14px 0 40px' }}>
            Ce que je maîtrise
          </h2>
        </Reveal>

        <div className="skills-grid">
          {data.skills.map((s, i) => {
            const isActive = active === s.name
            return (
              <Reveal key={s.name} delay={i * 70}>
                <button
                  className="skill-card"
                  onMouseEnter={() => setActive(s.name)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(isActive ? null : s.name)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontWeight: 700, fontSize: 16 }}>{s.name}</span>
                    <span className="label" style={{ color: 'var(--label-neutral)' }}>{s.level}</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: isActive ? `${s.levelPct}%` : `${s.levelPct}%` }} />
                  </div>
                  <p className={`skill-desc ${isActive ? 'open' : ''}`}>{s.description}</p>
                </button>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={200}>
          <h3 className="label" style={{ margin: '56px 0 18px' }}>Outils &amp; technologies</h3>
        </Reveal>
        <Reveal delay={240}>
          <div className="tools-wrap">
            {data.tools.map((t) => (
              <span key={t.name} className="tool-chip" title={t.level ? `Niveau : ${t.level}` : undefined}>
                {t.name}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={280}>
          <h3 className="label" style={{ margin: '40px 0 18px' }}>Langages de programmation</h3>
        </Reveal>
        <Reveal delay={300}>
          <div className="tools-wrap">
            {data.languages.map((l) => (
              <span key={l} className="tool-chip">{l}</span>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }
        .skill-card {
          text-align: left;
          background: transparent;
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-md);
          padding: 22px;
          cursor: pointer;
          color: #fff;
          font-family: var(--font-body);
          transition: border-color 0.15s ease;
        }
        .skill-card:hover { border-color: #fff; }
        .bar-track {
          height: 4px;
          background: var(--border-dark);
          border-radius: 4px;
          margin: 14px 0 10px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          background: #fff;
          transition: width 0.5s ease;
        }
        .skill-desc {
          font-size: 13px;
          color: var(--text-on-dark-secondary);
          line-height: 1.6;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          margin: 0;
          transition: max-height 0.25s ease, opacity 0.25s ease;
        }
        .skill-desc.open { max-height: 120px; opacity: 1; }
        .tools-wrap { display: flex; flex-wrap: wrap; gap: 10px; }
        .tool-chip {
          font-size: 13px;
          padding: 8px 16px;
          border: 1px solid var(--border-dark);
          border-radius: 999px;
          color: var(--text-on-dark-secondary);
        }
        @media (max-width: 700px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
