export default function Footer() {
  return (
    <footer style={{ padding: '32px 0', borderTop: '1px solid var(--border-dark)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span className="label">© {new Date().getFullYear()} Adolphe PANA</span>
        <span className="label">Sécurité informatique · Lomé, Togo</span>
      </div>
    </footer>
  )
}
