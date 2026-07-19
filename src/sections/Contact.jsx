import { useState } from 'react'
import { SectionHeading } from '../components/SectionHeading.jsx'
import { profile } from '../data/profile.js'
import './Contact.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact"
          description="Have a question, an opportunity, or just want to say hi? My inbox is always open."
        />
        <div className="contact__layout">
          <div className="contact__aside">
            <p>
              I'm currently open to interesting projects and roles. The fastest way to reach me is
              email — I usually reply within a day.
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
