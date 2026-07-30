import { profile } from '../data/profile.js'
import './Footer.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__copy">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  )
}
