import { SectionHeading } from '../components/SectionHeading.jsx'
import { projects } from '../data/projects.js'
import './Projects.css'

export function Projects() {
  return (
    <section id="projects" className="section section--alt">
      <div className="container">
        <SectionHeading
          eyebrow="Work"
          title="Projects"
          description="A selection of things I've built — from this portfolio itself to app experiments."
        />
        <ul className="projects__grid">
          {projects.map((project) => (
            <li key={project.id} className="project-card">
              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__description">{project.description}</p>
              </div>
              <div className="project-card__footer">
                <ul className="project-card__tech" aria-label="Technologies used">
                  {project.tech.map((tech) => (
                    <li key={tech} className="project-card__tech-item">
                      {tech}
                    </li>
                  ))}
                </ul>
                {(project.repoUrl || project.liveUrl) && (
                  <div className="project-card__links">
                    {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noreferrer">
                        Code ↗
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer">
                        Live ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
