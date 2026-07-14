import { useEffect, useState } from 'react'
import logo from '../assets/logo.svg'

const LINKS = [
  { href: '#a-propos', label: 'À propos' },
  { href: '#competences', label: 'Compétences' },
  { href: '#services', label: 'Services' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#projets', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border-dark)' : '1px solid transparent',
        backdropFilter: 'blur(6px)',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <nav className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logo} alt="Logo Adolphe PANA" width="32" height="32" />
          <span className="display" style={{ fontSize: 20 }}>P.W.E.A</span>
        </a>

        <div className="desktop-links" style={{ display: 'flex', gap: 32 }}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="label" style={{ color: 'var(--text-on-dark-secondary)' }}>
              {l.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="btn desktop-cta">Me contacter</a>

        <button
          aria-label="Ouvrir le menu"
          className="menu-btn"
          onClick={() => setOpen(!open)}
          style={{ display: 'none', background: 'none', border: '1px solid var(--border-dark)', borderRadius: 8, width: 40, height: 40, color: '#fff' }}
        >
          {open ? '×' : '≡'}
        </button>
      </nav>

      {open && (
        <div className="container" style={{ paddingBottom: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="label" style={{ color: '#fff' }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn" onClick={() => setOpen(false)}>Me contacter</a>
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-links, .desktop-cta { display: none !important; }
          .menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
