// Content sourced from context/resume.md — edit here to update the site.

export const experience = [
  {
    id: 'se-mrcooper',
    role: 'Software Engineer',
    company: 'Mr. Cooper Group',
    location: 'Chennai, India',
    period: 'Jul 2022 — Jul 2024',
    highlights: [
      'Built validation dashboards for CREO, an internal loan-validation engine, visualizing rule results and loan eligibility for underwriters — cutting underwriter review time by 35%.',
      'Developed REST APIs for PDF report generation and direct Encompass upload across 15+ validation dashboards.',
      'Automated title-document validation with Confluent.Kafka producers and consumers, monitored via Splunk, New Relic, and CloudWatch.',
      'Drove SonarQube adoption in the Azure DevOps CI/CD pipeline across 15+ repositories, reaching 80%+ code coverage on .NET microservices.',
      'Designed an MVP rules engine (JSON schema + rule parser) that let teams update loan-validation rules without code changes, replacing hard-coded logic.',
    ],
  },
  {
    id: 'se-intern-mrcooper',
    role: 'Software Engineer Intern',
    company: 'Mr. Cooper Group',
    location: 'Chennai, India',
    period: 'Jan 2022 — Jul 2022',
    highlights: [
      'Delivered REST APIs for the DECO PoC integrating an ML document-classification model and automating downstream email notifications — improving document-processing efficiency by 60%.',
      'Applied the Repository pattern to centralize MongoDB data access across document APIs, cutting response time by 40%.',
      'Optimized MongoDB indexing and queries with the data-indexing team, reducing document-retrieval latency by 20%.',
      'Automated loan case-management workflows in D365 CRM using UiPath, Power Automate, and .NET APIs.',
    ],
  },
]
