import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { profile } from '../data/profile.js'
import './Contact.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.31-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4V9Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  )
}

const SOCIAL_ICONS = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) {
    errors.name = 'Please tell me your name.'
  }
  if (!values.email.trim()) {
    errors.email = 'An email address is required.'
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "That email address doesn't look right."
  }
  if (values.message.trim().length < 10) {
    errors.message = 'Please write a message of at least 10 characters.'
  }
  return errors
}

export function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sent | error

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    // Clear the field's error as soon as the visitor starts fixing it.
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle')
      return
    }

    // No backend yet (see project-overview) — hand the message to the
    // visitor's email app via a prefilled mailto link.
    try {
      const subject = encodeURIComponent(`Portfolio message from ${values.name}`)
      const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('sent')
    } catch (error) {
      console.error('Could not open the mail client', error)
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section section--alt">
      <div className="container">
        <div className="contact__header">
          <SectionHeading
            eyebrow="Get in touch"
            title="Contact"
            description="Have a question, an opportunity, or just want to say hi? My inbox is always open."
          />
          <ul className="contact__socials" aria-label="Social links">
            {profile.socials.map((social) => {
              const Icon = SOCIAL_ICONS[social.label]
              return (
                <li key={social.label}>
                  <a
                    className="contact__social-link"
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                  >
                    {Icon ? <Icon /> : social.label}
                  </a>
                </li>
              )
            })}
            <li>
              <a
                className="contact__social-link"
                href={`mailto:${profile.email}`}
                aria-label="Email"
                title="Email"
              >
                <MailIcon />
              </a>
            </li>
          </ul>
        </div>
        <div className="contact__layout">
          <div className="contact__aside">
            <p className="contact__aside-lead">
              Please drop me a msg and I&apos;ll get back to you soon.
            </p>
            <a className="contact__email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form__field">
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name && (
                <p id="contact-name-error" className="contact-form__error">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email && (
                <p id="contact-email-error" className="contact-form__error">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="contact-form__field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
              />
              {errors.message && (
                <p id="contact-message-error" className="contact-form__error">
                  {errors.message}
                </p>
              )}
            </div>

            <button className="btn btn--primary" type="submit">
              Send message
            </button>

            {status === 'sent' && (
              <p className="contact-form__status" role="status">
                Your email app should have opened with the message ready to send. If it didn't,
                email me directly at {profile.email}.
              </p>
            )}
            {status === 'error' && (
              <p className="contact-form__status contact-form__status--error" role="alert">
                Something went wrong opening your email app — please email me directly at{' '}
                {profile.email}.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
