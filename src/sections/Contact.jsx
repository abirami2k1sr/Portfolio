import { profile } from '../data/profile.js'
import './Contact.css'

// Deliberately minimal: heading, one line, one call to action. The validated
// name/email/message form this replaced is archived in
// context/archive/pre-simple-contact/ — the mail app takes it from here.
export function Contact() {
  return (
    <section id="contact" className="section section--alt contact">
      <div className="container contact__inner">
        <h2 className="contact__title">Let&rsquo;s connect</h2>
        <p className="contact__lead">
          Have a question, an opportunity, or just want to say hi?
        </p>
        <a className="btn btn--primary" href={`mailto:${profile.email}`}>
          Get in touch
        </a>
      </div>
    </section>
  )
}
