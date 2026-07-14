import profile from '../data/profile.json'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <Reveal><span className="label">Contact</span></Reveal>
        <Reveal delay={60}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '14px 0 24px' }}>
            Discutons
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ color: 'var(--text-on-dark-secondary)', maxWidth: 480, marginBottom: 40, lineHeight: 1.7 }}>
            Disponible pour des stages, des projets pratiques ou toute opportunité en sécurité informatique et administration système.
          </p>
        </Reveal>

        <div className="contact-grid">
          <Reveal delay={140}>
            <a href={`mailto:${profile.email}`} className="contact-row">
              <span className="label">Email</span>
              <span>{profile.email}</span>
            </a>
          </Reveal>
          <Reveal delay={180}>
            <a href={`https://wa.me/${profile.phone.replace(/\D/g, '')}`} className="contact-row">
              <span className="label">Téléphone / WhatsApp</span>
              <span>{profile.phone}</span>
            </a>
          </Reveal>
          <Reveal delay={220}>
            <a href={profile.github} target="_blank" rel="noreferrer" className="contact-row">
              <span className="label">GitHub</span>
              <span>{profile.github.replace('https://', '')}</span>
            </a>
          </Reveal>
          <Reveal delay={260}>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-row">
              <span className="label">LinkedIn</span>
              <span>{profile.linkedin.replace('https://', '')}</span>
            </a>
          </Reveal>
          <Reveal delay={300}>
            <div className="contact-row" style={{ cursor: 'default' }}>
              <span className="label">Localisation</span>
              <span>{profile.location}</span>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .contact-grid { display: flex; flex-direction: column; }
        .contact-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 20px 0; border-top: 1px solid var(--border-dark);
          color: #fff;
        }
        .contact-row:last-child { border-bottom: 1px solid var(--border-dark); }
        @media (max-width: 600px) {
          .contact-row { flex-direction: column; align-items: flex-start; gap: 6px; }
        }
      `}</style>
    </section>
  )
}
