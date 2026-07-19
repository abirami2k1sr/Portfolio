import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { artworks } from '../data/artworks.js'
import { profile } from '../data/profile.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import './Art.css'

export default function Art() {
  useDocumentTitle(`Art · ${profile.name}`)

  return (
    <div className="art section">
      <div className="container">
        <Link className="art__back" to="/">
          ← Back to home
        </Link>
        <SectionHeading
          eyebrow="Gallery"
          title="Art"
          description="A few pieces from my sketchbook — digital work, ink, and paint. Gradient tiles stand in until real scans are added."
        />
        <ul className="art__grid">
          {artworks.map((artwork) => (
            <li key={artwork.id}>
              <figure className="art-card">
                {/* Custom property drives the placeholder gradient (see themes.css) */}
                <div className="art-card__frame" style={{ '--art-hue': artwork.hue }}>
                  {artwork.image ? (
                    <img className="art-card__image" src={artwork.image} alt={artwork.title} />
                  ) : (
                    <span className="art-card__mark" aria-hidden="true">
                      ≈
                    </span>
                  )}
                </div>
                <figcaption className="art-card__caption">
                  <p className="art-card__title">{artwork.title}</p>
                  {artwork.caption && <p className="art-card__meta">{artwork.caption}</p>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
