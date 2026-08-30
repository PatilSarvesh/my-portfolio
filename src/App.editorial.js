import React from "react";
import "./App.css";

const projects = [
  {
    number: "01",
    name: "AgentCargo",
    kind: "Agent infrastructure",
    description:
      "A cross-agent registry and package manager for reusable AI-agent skills, with deterministic packaging, integrity verification, versioning, and publishing workflows.",
    tags: ["Node.js", "CLI", "Registry", "AI tooling"],
    status: "Building now",
    updated: "active",
    url: "https://github.com/PatilSarvesh/AgentCargo",
  },
  {
    number: "02",
    name: "Bridge",
    kind: "Decision control plane",
    description:
      "A shared specification and decision layer for teams working with AI agents: durable context, human authority, governed workflows, and auditable continuation.",
    tags: ["TypeScript", "MCP", "Workers", "Audit"],
    status: "Building now",
    updated: "active",
    url: "https://github.com/PatilSarvesh/Bridge",
  },
  {
    number: "03",
    name: "ShortUrl",
    kind: "Product backend",
    description:
      "A product-ready URL shortener with custom links, expiry, redirect analytics, and a focused React interface over ASP.NET Core minimal APIs.",
    tags: ["C#", ".NET 8", "MongoDB", "REST"],
    status: "Shipped",
    updated: "stable",
    url: "https://github.com/PatilSarvesh/ShortUrl",
  },
  {
    number: "04",
    name: "CodeFusion",
    kind: "Developer toolbox",
    description:
      "A practical workspace for converting, validating, inspecting, and composing data workflows across JSON, CSV, YAML, Base64, JWT, UUID, URLs, and more.",
    tags: ["JavaScript", "React", "Workflows", "DX"],
    status: "Shipped",
    updated: "stable",
    url: "https://github.com/PatilSarvesh/CodeFusion",
  },
];

const stackGroups = [
  {
    label: "FOUNDATION",
    title: "Backend memory",
    items: ["C#", ".NET", "ASP.NET Core", "REST APIs"],
  },
  {
    label: "CURRENT",
    title: "Cloud-native systems",
    items: ["Python", "AWS", "Automation", "Architecture"],
  },
  {
    label: "PRODUCT EDGE",
    title: "Useful interfaces",
    items: ["TypeScript", "JavaScript", "React", "Node.js"],
  },
  {
    label: "DATA + DELIVERY",
    title: "Reliable handoffs",
    items: ["PostgreSQL", "MongoDB", "Qdrant", "GitHub Actions"],
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="arrow-icon">
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

function SectionLabel({ index, children }) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span>{children}</span>
    </div>
  );
}

function App() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Sarvesh Patil home">
          <span className="wordmark-mark">SP</span>
          <span className="wordmark-copy">BACKEND<br />SYSTEMS</span>
        </a>
        <nav className="main-nav" aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#systems">Systems</a>
          <a href="#now">Now</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="header-link" href="/Sarvesh_Patil_Resume.html" target="_blank" rel="noopener noreferrer">
          Resume <ArrowIcon />
        </a>
      </header>

      <main id="top">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> SARVESH PATIL / SOFTWARE ENGINEER</p>
            <h1 id="hero-title">Backend systems,<br /><em>made legible.</em></h1>
            <p className="hero-lede">
              I build APIs, control planes, developer tools, and cloud-native workflows that stay understandable as they grow.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#systems">View selected systems <ArrowIcon /></a>
              <a className="text-link" href="mailto:p.sarvesh.1111@gmail.com">Start a conversation <ArrowIcon /></a>
            </div>
          </div>

          <div className="snapshot" aria-label="Current engineering snapshot">
            <div className="snapshot-head">
              <span>system.snapshot</span>
              <span className="snapshot-live"><span className="status-dot status-dot-dark" /> online</span>
            </div>
            <div className="snapshot-grid">
              <span className="snapshot-key">NOW</span><strong>Python + AWS</strong>
              <span className="snapshot-key">FOUNDATION</span><strong>C# + .NET</strong>
              <span className="snapshot-key">EDGE</span><strong>TypeScript + React</strong>
              <span className="snapshot-key">DIRECTION</span><strong>Cloud + AI</strong>
            </div>
            <div className="snapshot-footer">
              <span>04 active systems</span>
              <span>status: current</span>
            </div>
            <div className="snapshot-grid-art" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          </div>
        </section>

        <section className="principles-band" aria-label="Engineering principles">
          <div className="section-wrap principles-grid">
            <span className="principle-intro">HOW I WORK</span>
            <span><b>01</b> clear contracts</span>
            <span><b>02</b> observable behavior</span>
            <span><b>03</b> human authority</span>
            <span><b>04</b> useful software</span>
          </div>
        </section>

        <section className="content-section section-wrap" id="about" aria-labelledby="about-title">
          <div className="section-aside"><SectionLabel index="01">About the work</SectionLabel></div>
          <div className="about-content">
            <h2 id="about-title">I’m not attached to one stack.<br /><span>I’m attached to dependable systems.</span></h2>
            <div className="about-columns">
              <p>
                My current work is in Python and AWS: cloud-native systems, automation, and operational reliability. My foundation is C# and .NET: architecture, APIs, contracts, and dependable delivery.
              </p>
              <p>
                TypeScript, React, and Node.js sit at the product edge, where good backend decisions become clear tools for people. The thread through every project is the same: make the behavior explicit, keep humans in control, and ship something useful.
              </p>
            </div>
          </div>
        </section>

        <section className="systems-section content-section section-wrap" id="systems" aria-labelledby="systems-title">
          <div className="section-aside"><SectionLabel index="02">Selected systems</SectionLabel></div>
          <div className="systems-content">
            <div className="section-heading-row">
              <div><h2 id="systems-title">Current build constellation</h2><p>Four repositories. One direction: infrastructure that earns trust.</p></div>
              <ExternalLink href="https://github.com/PatilSarvesh" className="text-link">All repositories</ExternalLink>
            </div>
            <div className="project-list">
              {projects.map((project) => (
                <article className="project-row" key={project.name}>
                  <div className="project-number">{project.number}</div>
                  <div className="project-main">
                    <div className="project-title-line"><h3>{project.name}</h3><span className="project-kind">{project.kind}</span></div>
                    <p>{project.description}</p>
                    <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                  <div className="project-meta"><span className="project-status"><span className="status-dot" />{project.status}</span><span>{project.updated}</span><ExternalLink href={project.url} className="project-link">Open repo</ExternalLink></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="now-section content-section section-wrap" id="now" aria-labelledby="now-title">
          <div className="section-aside"><SectionLabel index="03">Stack by responsibility</SectionLabel></div>
          <div className="now-content">
            <div className="section-heading-row"><div><h2 id="now-title">The right tool for the job.</h2><p>A working toolkit organized by the responsibility it carries.</p></div></div>
            <div className="stack-grid">
              {stackGroups.map((group) => <article className="stack-card" key={group.label}><span className="stack-label">{group.label}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}
            </div>
            <div className="focus-note"><span className="focus-mark">↗</span><div><span className="stack-label">CURRENT DIRECTION</span><p>Moving deeper into Python + AWS — cloud architecture, automation, and practical AI systems where humans stay in control.</p></div></div>
          </div>
        </section>

        <section className="contact-section content-section section-wrap" id="contact" aria-labelledby="contact-title">
          <div className="section-aside"><SectionLabel index="04">Open channel</SectionLabel></div>
          <div className="contact-content"><p className="eyebrow">HAVE A SYSTEM TO SHAPE?</p><h2 id="contact-title">Let’s make the<br /><em>next layer useful.</em></h2><p className="contact-copy">I’m open to backend engineering conversations, thoughtful collaborations, and products that need a reliable foundation.</p><div className="contact-actions"><a className="button button-primary" href="mailto:p.sarvesh.1111@gmail.com">Email me <ArrowIcon /></a><ExternalLink href="https://www.linkedin.com/in/patilsarvesh/" className="button button-secondary">LinkedIn</ExternalLink></div></div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><div><span className="footer-mark">SP</span><span>Systems over spectacle.</span></div><div><a href="https://github.com/PatilSarvesh" target="_blank" rel="noopener noreferrer">GitHub</a><span>© {new Date().getFullYear()} Sarvesh Patil</span></div></footer>
    </div>
  );
}

export default App;
