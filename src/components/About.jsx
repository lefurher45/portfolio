import profile from '../data/profile.json'
import experience from '../data/experience.json'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="a-propos">
      <div className="container">
        <Reveal><span className="label">À propos</span></Reveal>
        <Reveal delay={60}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '14px 0 40px' }}>
            Profil &amp; parcours
          </h2>
        </Reveal>

        <div className="about-grid">
          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--text-on-dark-secondary)', maxWidth: 640 }}>
              {profile.bio}
            </p>
          </Reveal>

          <div>
            <Reveal delay={80}>
              <h3 className="label" style={{ marginBottom: 18 }}>Formation</h3>
            </Reveal>
            {experience.education.map((e, i) => (
              <Reveal key={e.title} delay={100 + i * 60}>
                <div className="timeline-row">
                  <span className="label" style={{ minWidth: 96, color: 'var(--label-neutral)' }}>{e.year}</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>{e.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-on-dark-secondary)' }}>{e.place}</div>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={260}>
              <h3 className="label" style={{ margin: '32px 0 18px' }}>Expérience</h3>
            </Reveal>
            {experience.work.map((w, i) => (
              <Reveal key={w.place} delay={300 + i * 60}>
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontWeight: 700 }}>{w.role} — {w.place}</div>
                  <div className="label" style={{ margin: '4px 0 10px' }}>{w.period}</div>
                  <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-on-dark-secondary)', fontSize: 14, lineHeight: 1.8 }}>
                    {w.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 64px;
        }
        .timeline-row {
          display: flex;
          gap: 20px;
          padding: 14px 0;
          border-top: 1px solid var(--border-dark);
        }
        @media (max-width: 860px) {
          .about-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </section>
  )
}
