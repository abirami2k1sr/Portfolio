// Content sourced from context/resume.md + LinkedIn — edit here to update the site.
// Reverse-chronological (latest first): the route runs from where I am now at
// the top back to where it started at the bottom. Work highlights are
// condensed on purpose — the full detail lives in the résumé, the card only
// carries a few lines.
//
// Copy is the user's own words. No em dashes anywhere in rendered strings
// (user request, 2026-08-30); date ranges use an en dash.

export const journey = [
  {
    id: 'ms-iu',
    kind: 'Education',
    period: 'Aug 2024 – May 2026',
    title: 'Master of Science in Computer Science',
    place: 'Luddy School of Informatics, Indiana University',
    location: 'Bloomington, IN',
    summary:
      'Completed my master’s with a focus on user experience and app development.',
    photo: {
      src: '/journey/sample-gates.jpg',
      alt: 'Silhouette in graduation cap and gown framed by the Sample Gates arch at Indiana University',
      caption: 'Indiana University · Bloomington',
    },
  },
  {
    id: 'ta-luddy',
    kind: 'Work',
    period: 'Jan 2026 – May 2026',
    title: 'Teaching Assistant, AI on Ramp',
    place: 'Luddy School of Informatics, Indiana University',
    location: 'Bloomington, IN',
    summary:
      'Mentored students through core AI concepts for the AI on Ramp course (INFO/CSCI 33715), working hands-on with neural networks in Python and PyTorch.',
    photo: {
      src: '/journey/graduation.jpg',
      alt: 'Abirami in graduation cap and gown in front of the Sample Gates at Indiana University',
      caption: 'Indiana University · Bloomington',
    },
  },
  {
    id: 'se-mrcooper',
    kind: 'Work',
    period: 'Jul 2022 – Jul 2024',
    title: 'Software Engineer',
    place: 'Mr. Cooper Group',
    location: 'Chennai, India',
    summary:
      'Built the systems underwriters relied on daily: validation dashboards, Kafka pipelines, and a rules engine that let non-engineers change loan logic without touching code.',
    details: [
      'Built validation dashboards for CREO, the internal loan-validation engine, cutting underwriter review time by 35%.',
      'Shipped REST APIs for PDF report generation and Encompass upload across 15+ dashboards.',
      'Automated title-document validation with Kafka, monitored via Splunk, New Relic, and CloudWatch.',
      'Drove SonarQube adoption in the Azure DevOps pipeline, reaching 80%+ coverage across 15+ repositories.',
    ],
    photo: {
      src: '/journey/mrcooper.jpg',
      alt: 'Abirami standing in front of the Mr. Cooper logo at the Chennai office',
      caption: 'Mr. Cooper office · Chennai',
    },
  },
  {
    id: 'intern-mrcooper',
    kind: 'Work',
    period: 'Jan 2022 – Jul 2022',
    title: 'Software Engineer Intern',
    place: 'Mr. Cooper Group',
    location: 'Chennai, India',
    summary:
      'Built REST APIs for a document-classification proof of concept and automated loan workflows that had been done by hand.',
    details: [
      'Delivered REST APIs for DECO, an ML document-classification PoC, improving document-processing efficiency by 60%.',
      'Centralized MongoDB data access with the Repository pattern, cutting response times by 40%.',
      'Automated loan case-management workflows in D365 CRM with UiPath, Power Automate, and .NET APIs.',
    ],
    photo: {
      src: '/journey/mrcooper-intern.jpg',
      alt: 'Mr. Cooper employee badge held up in front of a laptop at the Chennai office',
      caption: 'Mr. Cooper Group · Chennai',
      // Portrait image cropped to the cards' 4:3 — keep the badge and
      // laptop screen in frame rather than the exact center.
      position: '50% 62%',
    },
  },
  {
    id: 'btech-cit',
    kind: 'Education',
    period: 'Aug 2018 – May 2022',
    title: 'Bachelor’s in Information Technology',
    place: 'Coimbatore Institute of Technology',
    location: 'Coimbatore, India',
    summary:
      'Built my computer science foundations here, and figured out the practical side of the theory we studied.',
  },
]
