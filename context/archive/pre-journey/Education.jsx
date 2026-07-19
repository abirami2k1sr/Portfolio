import { SectionHeading } from '../components/SectionHeading.jsx'
import { education } from '../data/education.js'
import './Education.css'

export function Education() {
  return (
    <section id="education" className="section section--alt">
      <div className="container">
        <SectionHeading eyebrow="Background" title="Education" />
        <ol className="education__list">
          {education.map((entry) => (
            <li key={entry.id} className="education__item">
              <p className="education__period">{entry.period}</p>
              <h3 className="education__degree">{entry.degree}</h3>
              <p className="education__school">
                {entry.school}
                {entry.location && (
                  <span className="education__location"> · {entry.location}</span>
                )}
              </p>
              {entry.details && <p className="education__details">{entry.details}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
