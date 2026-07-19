import { SectionHeading } from '../components/SectionHeading.jsx'
import { experience } from '../data/experience.js'
import './Experience.css'

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionHeading eyebrow="Career" title="Work Experience" />
        <ul className="experience__list">
          {experience.map((job) => (
            <li key={job.id} className="experience__card">
              <div className="experience__header">
                <div>
                  <h3 className="experience__role">{job.role}</h3>
                  <p className="experience__company">{job.company}</p>
                </div>
                <div className="experience__meta">
                  <p className="experience__period">{job.period}</p>
                  {job.location && <p className="experience__location">{job.location}</p>}
                </div>
              </div>
              <ul className="experience__highlights">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
