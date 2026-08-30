import React, { useEffect, useState } from "react";
import "./App.css";

const systems = [
  {
    number: "01",
    name: "AgentCargo",
    type: "Agent infrastructure",
    description: "A cross-agent registry and package manager for reusable AI-agent skills, with deterministic packaging, integrity verification, versioning, and publishing workflows.",
    tags: ["TypeScript", "PostgreSQL", "CLI"],
    status: "building now",
    url: "https://github.com/PatilSarvesh/AgentCargo",
  },
  {
    number: "02",
    name: "Bridge",
    type: "Decision control plane",
    description: "A shared specification and decision layer for teams working with AI agents: durable context, human authority, governed workflows, and auditable continuation.",
    tags: ["TypeScript", "REST", "MCP"],
    status: "building now",
    url: "https://github.com/PatilSarvesh/Bridge",
  },
  {
    number: "03",
    name: "ShortUrl",
    type: "Product backend",
    description: "A product-ready URL shortener with custom links, expiry, redirect analytics, and a focused React interface over ASP.NET Core minimal APIs.",
    tags: ["C#", ".NET 8", "MongoDB"],
    status: "shipped",
    url: "https://github.com/PatilSarvesh/ShortUrl",
  },
  {
    number: "04",
    name: "CodeFusion",
    type: "Developer toolbox",
    description: "A practical workspace for converting, validating, inspecting, and composing data workflows across JSON, CSV, YAML, Base64, JWT, UUID, URLs, and more.",
    tags: ["JavaScript", "React", "DX"],
    status: "shipped",
    url: "https://github.com/PatilSarvesh/CodeFusion",
  },
];

const experience = [
  {
    period: "MAY 2022 — PRESENT",
    role: "Senior Software Engineer",
    org: "Maximus GCC",
    location: "Bengaluru, India",
    highlights: [
      "Built and deployed Python services for a production, multi-tenant serverless Intelligent Document Processing platform on AWS using Lambda, Step Functions, S3, Bedrock, and Textract.",
      "Engineered event-driven orchestration with Step Functions task tokens and SNS for long-running extraction jobs, eliminating polling and enforcing strict JSON schemas.",
      "Implemented KMS ECDSA-signed webhooks, human-in-the-loop review with session locking, and observability through X-Ray, CloudWatch alarms, and Splunk.",
      "Delivered ModelOps workflows, TalentLens features, and provider-credentialing integrations across Python, React/Tailwind, and .NET microservices; improved template creation efficiency by 30% and cut delivery time by 20%.",
    ],
    focus: "Python · AWS · GenAI · .NET",
  },
  {
    period: "OCT 2021 — MAY 2022",
    role: "Associate Software Engineer",
    org: "Accenture",
    location: "Bengaluru, India",
    highlights: [
      "Trained and worked as a ServiceNow developer and ITOM specialist, developing workflows and frontend validations with Glide AJAX that improved efficiency by 15%.",
      "Implemented and tested pages and workflows with ServiceNow Automated Test Framework (ATF).",
    ],
    focus: "ServiceNow · ITOM · Glide AJAX",
  },
];

const layers = [
  {
    number: "01",
    layer: "runtime",
    title: "Languages & frameworks",
    value: "Python · C# · .NET · TypeScript · JavaScript · ASP.NET Core",
  },
  {
    number: "02",
    layer: "cloud",
    title: "AWS & orchestration",
    value: "Lambda · Step Functions · S3 · Textract · Bedrock · SQS/SNS · EventBridge · KMS",
  },
  {
    number: "03",
    layer: "data",
    title: "Persistence & retrieval",
    value: "PostgreSQL · MongoDB · MySQL/Aurora · SQL Server · Qdrant",
  },
  {
    number: "04",
    layer: "delivery",
    title: "Shipping & operations",
    value: "REST APIs · Git · GitHub Actions · AWS SAM · Docker · CloudWatch · X-Ray",
  },
  {
    number: "05",
    layer: "testing",
    title: "Confidence loops",
    value: "XUnit · Postman · ServiceNow ATF · structured extraction",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Make contracts explicit",
    body: "Schemas, boundaries, and predictable API behavior make a system easier to change without making it harder to trust.",
    note: "schemas / APIs / boundaries",
  },
  {
    number: "02",
    title: "Orchestrate the long-running",
    body: "Event-driven workflows keep asynchronous work observable and useful, even when the happy path takes more than one request.",
    note: "events / tasks / state",
  },
  {
    number: "03",
    title: "Operate what ships",
    body: "Security evidence, human review, and clear signals belong in the product—not in a postscript after deployment.",
    note: "security / review / signals",
  },
];

const navItems = [
  { id: "top", label: "Overview" },
  { id: "systems", label: "Systems" },
  { id: "experience", label: "Experience" },
  { id: "method", label: "Method" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M5 3h8v8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

function ExternalLink({ href, children, className = "" }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowIcon />
    </a>
  );
}

function SectionIntro({ number, eyebrow, title, accent, description, titleId }) {
  return (
    <div className="section-intro">
      <div className="section-heading">
        <span className="section-number">{number}</span>
        <div>
          <p className="section-eyebrow">{eyebrow}</p>
          <h2 id={titleId}>{title} <em>{accent}</em></h2>
        </div>
      </div>
      <p className="section-description">{description}</p>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const updateActiveSection = () => {
      if (!sections.length) return;
      const atPageEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atPageEnd) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      const marker = window.scrollY + Math.max(140, window.innerHeight * 0.3);
      const current = sections.reduce((active, section) => {
        return section.offsetTop <= marker ? section : active;
      }, sections[0]);
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
    <div className="atlas">
      <a className="skip-link" href="#content">Skip to content</a>

      <header className="atlas-header">
        <a className="atlas-brand" href="#top" aria-label="Sarvesh Patil home">
          <span className="brand-mark">SP</span>
          <span className="brand-copy">sarvesh patil<small>backend systems</small></span>
        </a>
        <nav className="atlas-nav" aria-label="Primary navigation">
          {navItems.map((item, index) => (
            <a
              href={"#" + item.id}
              className={activeSection === item.id ? "active" : ""}
              aria-current={activeSection === item.id ? "page" : undefined}
              key={item.id}
            >
              <span>{String(index).padStart(2, "0")}</span>{item.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <ExternalLink href="https://github.com/PatilSarvesh">GitHub</ExternalLink>
          <a href="/Sarvesh_Patil_Resume.html" target="_blank" rel="noopener noreferrer">Resume <ArrowIcon /></a>
        </div>
      </header>

      <main id="content">
        <section className="atlas-hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-overline"><span>01 / PROFILE</span><span>IND / OPEN TO WORK</span></div>
            <p className="hero-role">Senior Software Engineer</p>
            <h1 id="hero-title">Building <em>dependable</em><br />systems for real work.</h1>
            <p className="hero-lede">I build APIs, control planes, developer tools, and cloud-native workflows that stay understandable as they grow.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#systems">Explore systems <ArrowIcon /></a>
              <a className="inline-link" href="#experience">Read the work history <ArrowIcon /></a>
            </div>
          </div>

          <div className="architecture-plate" aria-label="Current architecture focus">
            <div className="plate-head"><span>architecture / working view</span><span className="plate-live"><i /> current</span></div>
            <div className="architecture-map">
              <div className="map-node"><span>01</span><strong>contracts</strong><small>API / schema</small></div>
              <div className="map-node map-node-accent"><span>02</span><strong>orchestration</strong><small>events / state</small></div>
              <div className="map-node"><span>03</span><strong>intelligence</strong><small>Bedrock / extraction</small></div>
              <div className="map-node"><span>04</span><strong>delivery</strong><small>signals / review</small></div>
            </div>
            <div className="plate-foot"><span>python + aws</span><span>clear boundaries</span><span>human authority</span></div>
          </div>
        </section>

        <section className="principles-band" aria-label="Engineering principles">
          <div className="principle"><span>01</span> clear contracts</div>
          <div className="principle"><span>02</span> observable behavior</div>
          <div className="principle"><span>03</span> human authority</div>
          <div className="principle"><span>04</span> useful software</div>
        </section>

        <section className="atlas-section" id="systems" aria-labelledby="systems-title">
          <div className="atlas-container">
            <SectionIntro number="02" eyebrow="SELECTED SYSTEMS" title="Four systems." accent="One direction." titleId="systems-title" description="Infrastructure that earns trust by making its behavior visible, its boundaries clear, and its outcomes useful." />
            <div className="system-list">
              {systems.map((system) => (
                <article className="system-record" key={system.name}>
                  <span className="record-number">{system.number}</span>
                  <div className="record-main">
                    <div className="record-title"><h3>{system.name}</h3><span>{system.type}</span></div>
                    <p>{system.description}</p>
                    <div className="record-tags">{system.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <div className="record-meta">
                    <span className="record-status"><i /> {system.status}</span>
                    <ExternalLink href={system.url} className="record-link">Repository</ExternalLink>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="atlas-section atlas-section-alt" id="experience" aria-labelledby="experience-title">
          <div className="atlas-container">
            <SectionIntro number="03" eyebrow="EXPERIENCE" title="Where I’ve" accent="worked." titleId="experience-title" description="Production engineering across Python, AWS, GenAI, .NET, and ServiceNow—with outcomes measured in reliability, speed, and useful workflows." />
            <div className="experience-timeline">
              {experience.map((item, index) => (
                <article className="timeline-entry" key={item.org}>
                  <div className="timeline-date"><span>{item.period}</span><strong>{String(index + 1).padStart(2, "0")}</strong></div>
                  <div className="timeline-body">
                    <div className="timeline-title"><div><h3>{item.role}</h3><p>{item.org} <span>{item.location}</span></p></div><span className="timeline-focus">{item.focus}</span></div>
                    <ul>{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="atlas-section" id="method" aria-labelledby="method-title">
          <div className="atlas-container">
            <SectionIntro number="04" eyebrow="METHOD" title="Make behavior" accent="easy to trust." titleId="method-title" description="The decisions underneath the stack matter more than the stack itself." />
            <div className="capability-grid">
              {capabilities.map((capability) => (
                <article className="capability-card" key={capability.number}>
                  <span className="capability-number">{capability.number}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.body}</p>
                  <span className="capability-note">{capability.note}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="atlas-section atlas-section-alt" id="stack" aria-labelledby="stack-title">
          <div className="atlas-container">
            <SectionIntro number="05" eyebrow="STACK BY RESPONSIBILITY" title="The right tool" accent="for the job." titleId="stack-title" description="A working toolkit organized by the responsibility each layer carries." />
            <div className="layer-table">
              {layers.map((item) => (
                <div className="layer-row" key={item.number}>
                  <span className="layer-number">{item.number}</span>
                  <div className="layer-name"><span>{item.layer}</span><strong>{item.title}</strong></div>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="atlas-contact" id="contact" aria-labelledby="contact-title">
          <div className="atlas-container contact-inner">
            <div>
              <p className="section-eyebrow">06 / OPEN CHANNEL</p>
              <h2 id="contact-title">Have a layer<br /><em>to build?</em></h2>
            </div>
            <div className="contact-copy">
              <p>I’m open to backend engineering conversations, thoughtful collaborations, and products that need a reliable foundation.</p>
              <div className="contact-actions">
                <a className="button button-primary" href="mailto:p.sarvesh.1111@gmail.com">p.sarvesh.1111@gmail.com <ArrowIcon /></a>
                <ExternalLink href="https://www.linkedin.com/in/patilsarvesh/" className="button button-secondary">LinkedIn</ExternalLink>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="atlas-footer">
        <span><strong>SP</strong> / dependable systems, useful software.</span>
        <span>© {new Date().getFullYear()} Sarvesh Patil</span>
      </footer>
    </div>
  );
}

export default App;
