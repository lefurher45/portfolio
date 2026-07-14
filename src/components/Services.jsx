import services from '../data/services.json'
import Reveal from './Reveal'

const ICONS = {
  shield: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 3l7 3v5.2c0 4.6-3 8.4-7 9.8-4-1.4-7-5.2-7-9.8V6l7-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  radar: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <path d="M12 12L19 7" strokeLinecap="round" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.2M12 18.8V21M21 12h-2.2M5.2 12H3M18.4 5.6l-1.5 1.5M7.1 16.9l-1.5 1.5M18.4 18.4l-1.5-1.5M7.1 7.1L5.6 5.6" strokeLinecap="round" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" strokeLinecap="round" />
      <path d="M16 4.5c1.5 0.4 2.5 1.7 2.5 3.2 0 1.4-.9 2.7-2.2 3.1" strokeLinecap="round" />
      <path d="M15.5 15.2c2.5.5 4.5 2.4 4.5 4.8" strokeLinecap="round" />
    </svg>
  ),
}

function scrollToContact(e) {
  e.preventDefault()
  const target = document.getElementById('contact')
  if (target) target.scrollIntoView({ behavior: 'smooth' })
}

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <Reveal><span className="label">Services</span></Reveal>
        <Reveal delay={60}>
          <h2 className="display" style={{ fontSize: 'clamp(32px, 5vw, 56px)', margin: '14px 0 40px' }}>
            Ce que je propose
          </h2>
        </Reveal>

        <div className="svc-grid">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <div className="svc-card">
                <div className="svc-icon">
                  {s.image ? <img src={s.image} alt="" /> : (ICONS[s.icon] || ICONS.shield)}
                </div>
                <div style={{ fontWeight: 700, fontSize: 17, marginTop: 18 }}>{s.title}</div>
                <p style={{ fontSize: 14, color: 'var(--text-on-dark-secondary)', lineHeight: 1.7, marginTop: 8, flex: 1 }}>
                  {s.description}
                </p>
                <a href="#contact" onClick={scrollToContact} className="btn btn-outline svc-btn">
                  Me contacter
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 18px;
        }
        .svc-card {
          display: flex;
          flex-direction: column;
          text-align: left;
          background: transparent;
          border: 1px solid var(--border-dark);
          border-radius: var(--radius-md);
          padding: 24px;
          color: #fff;
          font-family: var(--font-body);
          transition: border-color 0.15s ease, transform 0.15s ease;
        }
        .svc-card:hover { border-color: #fff; transform: translateY(-2px); }
        .svc-icon {
          width: 52px; height: 52px;
          border: 1px solid var(--border-dark);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
        }
        .svc-btn {
          margin-top: 20px;
          align-self: flex-start;
          font-size: 12px;
          padding: 11px 20px;
        }
      `}</style>
    </section>
  )
}
