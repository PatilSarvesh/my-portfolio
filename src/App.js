import React, { useEffect, useState } from "react";
import "./App.css";

const navItems = [
  { id: "intro", label: "Intro" },
  { id: "systems", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "approach", label: "Approach" },
  { id: "contact", label: "Contact" },
];

const profileFacts = [
  { label: "role", value: "Senior Software Engineer", note: "Maximus GCC" },
  { label: "focus", value: "Python + AWS", note: "backend / cloud" },
  { label: "projects", value: "04 public builds", note: "repositories linked" },
  { label: "base", value: "Bengaluru, India", note: "UTC +05:30" },
];

const projects = [
  {
    number: "01",
    name: "AgentCargo",
    type: "Agent infrastructure",
    problem: "Reusable agent skills need a dependable way to be packaged, found, and installed.",
    build: "A registry and CLI with deterministic packaging, integrity checks, versioning, authentication, and publishing workflows.",
    stack: ["TypeScript", "PostgreSQL", "CLI"],
    signal: "public source · package workflow in progress",
    status: "building now",
    url: "https://github.com/PatilSarvesh/AgentCargo",
  },
  {
    number: "02",
    name: "Bridge",
    type: "Agent governance layer",
    problem: "Agent teams need durable context and human authority when work continues across sessions.",
    build: "A shared specification layer for governed decisions, auditable workflows, and clear continuation boundaries.",
    stack: ["TypeScript", "REST", "MCP"],
    signal: "public source · protocol design in progress",
    status: "building now",
    url: "https://github.com/PatilSarvesh/Bridge",
  },
  {
    number: "03",
    name: "ShortUrl",
    type: "Product backend",
    problem: "A short link is only useful when ownership, expiry, and redirect behavior are explicit.",
    build: "A .NET 8 minimal API with custom links, expiry rules, redirect analytics, and a focused React interface.",
    stack: ["C#", ".NET 8", "MongoDB"],
    signal: "shipped · API + React interface",
    status: "shipped",
    url: "https://github.com/PatilSarvesh/ShortUrl",
  },
  {
    number: "04",
    name: "CodeFusion",
    type: "Developer toolbox",
    problem: "Small data transformations become expensive when every format needs a separate utility.",
    build: "A practical workspace for converting, validating, inspecting, and composing JSON, CSV, YAML, Base64, JWT, UUID, and URL workflows.",
    stack: ["JavaScript", "React", "DX"],
    signal: "shipped · utility workspace",
    status: "shipped",
    url: "https://github.com/PatilSarvesh/CodeFusion",
  },
];

const experience = [
  {
    period: "MAY 2022 — NOW",
    role: "Senior Software Engineer",
    company: "Maximus GCC",
    location: "Bengaluru, India",
    summary: "Building Python and AWS services for a production, multi-tenant Intelligent Document Processing platform.",
    details: [
      "Designed event-driven workflows with Lambda, Step Functions, SNS, S3, Textract, and Bedrock for long-running extraction jobs.",
      "Added KMS ECDSA-signed webhooks, human-in-the-loop review with session locking, and operational signals through X-Ray, CloudWatch, and Splunk.",
      "Delivered ModelOps, TalentLens, and provider-credentialing features across Python, React, and .NET microservices; improved template creation efficiency by 30%.",
    ],
  },
  {
    period: "OCT 2021 — MAY 2022",
    role: "Associate Software Engineer",
    company: "Accenture",
    location: "Bengaluru, India",
    summary: "Worked as a ServiceNow developer and ITOM specialist across workflows, frontend validations, and automated tests.",
    details: [
      "Built Glide AJAX validations and ServiceNow workflows that improved operational efficiency by 15%.",
      "Implemented and tested pages and workflows with ServiceNow Automated Test Framework (ATF).",
    ],
  },
];

const principles = [
  { number: "01", title: "Name the boundary", body: "Clear contracts make change boring in the best possible way." },
  { number: "02", title: "Make state visible", body: "Long-running work deserves durable state, not a hidden polling loop." },
  { number: "03", title: "Leave evidence", body: "Security, review, tests, and observability belong beside the feature." },
];

const toolbox = [
  { label: "languages", items: "Python · C# · TypeScript · JavaScript · SQL" },
  { label: "aws", items: "Lambda · Step Functions · S3 · Textract · Bedrock · SQS/SNS · EventBridge" },
  { label: "backend", items: "ASP.NET Core · REST APIs · Microservices · SQLAlchemy · Node.js · MCP" },
  { label: "data + delivery", items: "PostgreSQL · MongoDB · Aurora · SQL Server · Qdrant · Docker · AWS SAM" },
];

function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="download-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 2v8m0 0 3-3m-3 3L5 7M3 13h10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function ThemeIcon({ isDark }) {
  return (
    <svg className="theme-icon" viewBox="0 0 16 16" aria-hidden="true">
      {isDark ? (
        <>
          <circle cx="8" cy="8" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M12.6 3.4l-1.4 1.4M4.8 11.2l-1.4 1.4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
        </>
      ) : (
        <path d="M13.2 10.4A5.5 5.5 0 0 1 5.6 2.8a5.6 5.6 0 1 0 7.6 7.6Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function getInitialTheme() {
  try {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  } catch (error) {
    // Use the light theme if storage or media-query access is unavailable.
  }
  return "light";
}

function ExternalLink({ href, children, className = "" }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowIcon />
    </a>
  );
}

function SectionHeader({ number, label, title, accent, titleId }) {
  return (
    <header className="section-header">
      <span className="section-number">{number}</span>
      <div>
        <p className="eyebrow">{label}</p>
        <h2 id={titleId}>{title} <em>{accent}</em></h2>
      </div>
      <span className="section-rule" aria-hidden="true" />
    </header>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("intro");
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#0f1a1d" : "#e8ede9");
    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch (error) {
      // Keep the selected theme for this session if storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean);
    const updateActiveSection = () => {
      if (!sections.length) return;
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }
      const marker = window.scrollY + Math.max(130, window.innerHeight * 0.28);
      const current = sections.reduce((active, section) => (section.offsetTop <= marker ? section : active), sections[0]);
      setActiveSection(current.id);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <div className="systems-index">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="topbar">
        <a className="brand" href="#intro" aria-label="Sarvesh Patil home">
          <span className="brand-mark">SP</span>
          <span className="brand-copy"><strong>Sarvesh Patil</strong><small>systems index / 2026</small></span>
        </a>
        <div className="availability"><span className="status-dot" aria-hidden="true" /> available for select backend conversations</div>
        <nav className="topnav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              href={`#${item.id}`}
              className={activeSection === item.id ? "is-active" : ""}
              aria-current={activeSection === item.id ? "location" : undefined}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="topbar-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to night mode"}
            onClick={() => setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"))}
          >
            <ThemeIcon isDark={theme === "dark"} />
            <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Night"}</span>
          </button>
          <ExternalLink href="https://github.com/PatilSarvesh" className="header-github">GitHub</ExternalLink>
          <a className="resume-button" href="/Sarvesh_Patil_Resume.pdf" download="Sarvesh_Patil_Resume.pdf">Resume <DownloadIcon /></a>
        </div>
      </header>

      <main id="main-content">
        <section className="intro page-section" id="intro" aria-labelledby="intro-title">
          <div className="intro-grid">
            <div className="intro-copy">
              <p className="eyebrow">01 / PROFILE</p>
              <h1 id="intro-title">Backend systems<br /><em>with a calm surface.</em></h1>
              <p className="intro-lede">I build APIs, cloud workflows, and developer infrastructure that stays understandable when the work gets complicated.</p>
              <div className="intro-actions">
                <a className="primary-action" href="#systems">view projects <ArrowIcon /></a>
                <ExternalLink href="https://www.linkedin.com/in/patilsarvesh/" className="text-action">LinkedIn</ExternalLink>
              </div>
            </div>
            <aside className="context-panel" aria-label="Current context">
              <div className="panel-label">now</div>
              <dl>
                <div><dt>working at</dt><dd>Maximus GCC</dd></div>
                <div><dt>building with</dt><dd>Python + AWS</dd></div>
                <div><dt>exploring</dt><dd>agent infrastructure</dd></div>
                <div><dt>based in</dt><dd>Bengaluru, India</dd></div>
              </dl>
              <div className="context-footer"><span className="status-dot" aria-hidden="true" /> production-minded / still curious</div>
            </aside>
          </div>

          <div className="evidence-bar" aria-label="Profile facts">
            {profileFacts.map((fact) => (
              <div className="evidence-item" key={fact.label}>
                <span>{fact.label}</span>
                <strong>{fact.value}</strong>
                <small>{fact.note}</small>
              </div>
            ))}
          </div>
          <div className="intro-footer"><span>PYTHON / AWS / APIS / AUTOMATION</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>

        <section className="page-section systems-section" id="systems" aria-labelledby="systems-title">
          <SectionHeader number="02" label="SELECTED PROJECTS" title="Projects in" accent="context." titleId="systems-title" />
          <div className="section-intro-row">
            <p>Four public projects, described the way I approach backend work: the problem first, the solution second, and the evidence that makes it worth keeping.</p>
            <span className="section-note">problem / solution / status / link</span>
          </div>

          <div className="systems-table">
            <div className="table-head" aria-hidden="true"><span>no.</span><span>project</span><span>why it exists / what it does</span><span>stack / link</span></div>
            {projects.map((project) => (
              <article className="system-row" key={project.name}>
                <div className="system-number">{project.number}</div>
                <div className="system-name">
                  <span className="system-type">{project.type}</span>
                  <h3>{project.name}</h3>
                  <span className={`state state-${project.status === "shipped" ? "shipped" : "active"}`}><i aria-hidden="true" /> {project.status}</span>
                </div>
                <div className="system-context">
                  <div><span>problem</span><p>{project.problem}</p></div>
                  <div><span>solution</span><p>{project.build}</p></div>
                </div>
                <div className="system-side">
                  <div className="system-signal"><span>status</span><strong>{project.signal}</strong></div>
                  <div className="stack-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
                  <ExternalLink href={project.url} className="row-link">view repository</ExternalLink>
                </div>
              </article>
            ))}
          </div>

          <div className="architecture-band">
            <div className="architecture-copy">
              <span className="eyebrow">BACKEND LENS</span>
              <h3>Boundaries are the feature.</h3>
              <p>Whether the job is a link, a workflow, or an agent, I start by making ownership, state, and failure modes explicit.</p>
            </div>
            <ol className="architecture-flow" aria-label="Backend delivery flow">
              <li><span>01</span><strong>contract</strong></li>
              <li><span>02</span><strong>orchestrate</strong></li>
              <li><span>03</span><strong>observe</strong></li>
              <li><span>04</span><strong>improve</strong></li>
            </ol>
          </div>
        </section>

        <section className="page-section experience-section" id="experience" aria-labelledby="experience-heading">
          <SectionHeader number="03" label="EXPERIENCE" title="Experience" accent="in practice." titleId="experience-heading" />
          <div className="experience-grid">
            <div className="experience-intro">
              <p className="large-note">Software gets real when someone depends on it.</p>
              <p>My day job is where the ideas meet permissions, queues, migrations, reviews, incidents, and the people who have to operate the result.</p>
              <a className="quiet-link resume-download-link" href="/Sarvesh_Patil_Resume.pdf" download="Sarvesh_Patil_Resume.pdf">Resume <DownloadIcon /></a>
            </div>
            <div className="experience-list">
              {experience.map((item) => (
                <article className="experience-row" key={item.company}>
                  <div className="experience-period"><span>{item.period}</span><b aria-hidden="true">↘</b></div>
                  <div className="experience-body">
                    <div className="experience-title"><h3>{item.role}</h3><span>{item.company}</span></div>
                    <p className="experience-summary">{item.summary}</p>
                    <ul>{item.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                    <span className="experience-location">{item.location}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section approach-section" id="approach" aria-labelledby="approach-heading">
          <SectionHeader number="04" label="HOW I WORK" title="Engineering" accent="approach." titleId="approach-heading" />
          <div className="approach-grid">
            <div className="now-panel">
              <span className="eyebrow">NOW / 2026</span>
              <h3>Making complicated workflows feel routine.</h3>
              <p>At Maximus GCC, I work in Python and AWS on document-processing workflows with long-running jobs, structured extraction, human review, and observable delivery.</p>
              <p className="now-note"><span className="status-dot" aria-hidden="true" /> exploring agent infrastructure in public</p>
            </div>
            <div className="principles-panel">
              {principles.map((principle) => (
                <article className="principle-row" key={principle.number}>
                  <span>{principle.number}</span>
                  <div><h3>{principle.title}</h3><p>{principle.body}</p></div>
                </article>
              ))}
            </div>
          </div>

          <div className="toolbox">
            <div className="toolbox-heading"><span className="eyebrow">CURRENT TOOLBOX</span><span>the tools are means / the boundaries are the point</span></div>
            <div className="toolbox-list">
              {toolbox.map((group) => (
                <div className="toolbox-row" key={group.label}><span>{group.label}</span><strong>{group.items}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="contact-topline"><span>05 / CONTACT</span><span>EMAIL IS BEST</span></div>
          <div className="contact-grid">
            <div className="contact-lead">
              <p className="eyebrow">GET IN TOUCH</p>
              <h2 id="contact-heading">Let’s make the next<br /><em>system clearer.</em></h2>
              <p className="contact-lede">I’m open to backend engineering conversations, thoughtful collaborations, and products that need a reliable foundation.</p>
            </div>
            <aside className="contact-card" aria-label="Contact details">
              <div className="contact-card-top"><span className="panel-label">contact details</span><span className="contact-status"><i aria-hidden="true" /> available</span></div>
              <a className="contact-email" href="mailto:p.sarvesh.1111@gmail.com">p.sarvesh.1111@gmail.com <ArrowIcon /></a>
              <div className="contact-links">
                <ExternalLink href="https://www.linkedin.com/in/patilsarvesh/" className="contact-link">LinkedIn</ExternalLink>
                <ExternalLink href="https://github.com/PatilSarvesh" className="contact-link">GitHub</ExternalLink>
                <a className="contact-link" href="/Sarvesh_Patil_Resume.pdf" download="Sarvesh_Patil_Resume.pdf">Resume <DownloadIcon /></a>
              </div>
              <div className="contact-fit"><span className="eyebrow">I CAN HELP WITH</span><ul><li>Python + AWS backend systems</li><li>APIs, workflows, and developer infrastructure</li></ul></div>
            </aside>
          </div>
        </section>
      </main>

      <footer className="site-footer"><span>SP / systems index</span><span>© {new Date().getFullYear()} Sarvesh Patil</span><span>built with useful constraints</span></footer>
    </div>
  );
}

export default App;
