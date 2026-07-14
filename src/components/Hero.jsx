import profile from '../data/profile.json'
import photo from './assets/portrait.png'
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section id="top" style={{ paddingTop: 160, borderBottom: '1px solid var(--border-dark)' }}>
      <div className="container hero-grid">
        <div>
          <Reveal>
            <span className="label">Sécurité informatique</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display" style={{ fontSize: 'clamp(48px, 8vw, 92px)', margin: '18px 0' }}>
              {profile.name}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ fontSize: 20, color: 'var(--text-on-dark-secondary)', maxWidth: 480, marginBottom: 12 }}>
              {profile.title}
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p style={{ fontSize: 15, color: 'var(--text-on-dark-secondary)', maxWidth: 460, lineHeight: 1.7 }}>
              {profile.tagline}
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div style={{ display: 'flex', gap: 16, marginTop: 36, flexWrap: 'wrap' }}>
              <a className="btn" href={profile.cvFile} download>Télécharger le CV</a>
              <a className="btn btn-outline" href="#projets">Voir les projets</a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={12} className="hero-photo-wrap">
          <div className="hero-photo-frame">
            <img src={photo} alt={profile.name} className="hero-photo" />
          </div>
        </Reveal>
      </div>

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          padding-bottom: 100px;
        }
        .hero-photo-frame {
          border: px solid var(--border-dark);
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 3/4;
        }
        .hero-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(1) contrast(1.02);
        }
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr; padding-bottom: 56px; }
          .hero-photo-frame { max-width: 340px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
