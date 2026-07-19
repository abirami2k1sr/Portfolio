import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { hobbies } from '../data/hobbies.js'
import './Hobbies.css'

export function Hobbies() {
  return (
    <section id="hobbies" className="section section--alt">
      <div className="container">
        <SectionHeading eyebrow="Beyond code" title="Hobbies" />
        <ul className="hobbies__grid">
          {hobbies.map((hobby) => (
            <li key={hobby.id} className="hobby-card">
              <span className="hobby-card__icon" aria-hidden="true">
                {hobby.icon}
              </span>
              <h3 className="hobby-card__title">{hobby.title}</h3>
              <p className="hobby-card__description">{hobby.description}</p>
              {hobby.link && (
                <Link className="hobby-card__link" to={hobby.link.to}>
                  {hobby.link.label} →
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
