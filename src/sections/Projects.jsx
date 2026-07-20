import { SectionHeading } from '../components/SectionHeading.jsx'
import { projects } from '../data/projects.js'
import './Projects.css'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="17" height="17" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeading
          eyebrow="Work"
          title="Projects"
          />
      </div>

      {/* Cards stick in a cascade: each one a header-band lower than the
          previous, so covered projects keep their name + tech visible. */}
      <div className="projects__cards container">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className={`project-card project-card--${index + 1}`}
            aria-labelledby={`project-title-${project.id}`}
          >
            <div className="project-card__inner">
              <header className="project-card__header">
                <h3 className="project-card__title" id={`project-title-${project.id}`}>
                  <span className="project-card__number" aria-hidden="true">
                    ( 0{index + 1} )
                  </span>
                  {project.title}
                </h3>
              </header>

              <div className="project-card__body">
                <div className="project-card__content">
                  <p className="project-card__description">{project.description}</p>
                  <ul className="project-card__tech" aria-label="Built with">
                    {project.tech.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                  <div className="project-card__links">
                    {project.githubUrl && (
                      <a
                        className="project-card__link project-card__link--solid"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} on GitHub`}
                      >
                        <GitHubIcon />
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        className="project-card__link project-card__link--ghost"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${project.title} live site`}
                      >
                        <ExternalIcon />
                        Live site
                      </a>
                    )}
                  </div>
                </div>

                <div className="project-card__media" aria-hidden="true">
                  {project.image ? (
                    <img src={project.image} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <div className="project-card__placeholder">
                      <span>0{index + 1}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
