import React from "react";
import "./App.css";

const systems = [
  {
    number: "01",
    name: "AgentCargo",
    type: "Agent infrastructure",
    description: "A registry and package manager for reusable AI-agent skills, built around deterministic packaging, integrity, versioning, and publishing.",
    tags: ["Node.js", "CLI", "Registry"],
    status: "in progress",
    updated: "active",
    url: "https://github.com/PatilSarvesh/AgentCargo",
  },
  {
    number: "02",
    name: "Bridge",
    type: "Decision control plane",
    description: "A shared specification layer for teams working with AI agents: durable context, human authority, governed decisions, and auditable continuation.",
    tags: ["TypeScript", "MCP", "Workers"],
    status: "in progress",
    updated: "active",
    url: "https://github.com/PatilSarvesh/Bridge",
  },
  {
    number: "03",
    name: "ShortUrl",
    type: "Product backend",
    description: "A .NET 8 URL-shortening product with custom links, expiry, redirect analytics, and a focused interface over minimal APIs.",
    tags: ["C#", ".NET 8", "MongoDB"],
    status: "shipped",
    updated: "stable",
    url: "https://github.com/PatilSarvesh/ShortUrl",
  },
  {
    number: "04",
    name: "CodeFusion",
    type: "Developer toolbox",
    description: "A workspace for converting, validating, and inspecting data across JSON, CSV, YAML, Base64, JWT, UUID, URLs, and more.",
    tags: ["JavaScript", "React", "DX"],
    status: "shipped",
    updated: "stable",
    url: "https://github.com/PatilSarvesh/CodeFusion",
  },
];

const stack = [
  { label: "foundation", value: "C# · .NET · ASP.NET Core · REST APIs" },
  { label: "current", value: "Python · AWS · automation · cloud architecture" },
  { label: "product edge", value: "TypeScript · JavaScript · React · Node.js" },
  { label: "data + delivery", value: "PostgreSQL · MongoDB · Qdrant · GitHub Actions" },
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
      {children}<ArrowIcon />
    </a>
  );
}

function RailLabel({ children }) {
  return <span className="rail-label">{children}</span>;
}

function App() {
  return (
    <div className="workbench">
      <aside className="side-rail" aria-label="Portfolio index">
        <a className="rail-logo" href="#top" aria-label="Sarvesh Patil home">SP</a>
        <div className="rail-line" />
        <nav className="rail-nav">
          <a href="#top"><span>00</span><RailLabel>start</RailLabel></a>
          <a href="#systems"><span>01</span><RailLabel>systems</RailLabel></a>
          <a href="#about"><span>02</span><RailLabel>method</RailLabel></a>
          <a href="#now"><span>03</span><RailLabel>stack</RailLabel></a>
          <a href="#contact"><span>04</span><RailLabel>contact</RailLabel></a>
        </nav>
        <div className="rail-bottom"><span>SP / live</span><span className="rail-status"><i /> open</span></div>
      </aside>

      <div className="workbench-body">
        <header className="topbar">
          <span className="breadcrumb">sarvesh.patil / portfolio</span>
          <div className="topbar-links">
            <ExternalLink href="https://github.com/PatilSarvesh">GitHub</ExternalLink>
            <a href="/Sarvesh_Patil_Resume.html" target="_blank" rel="noopener noreferrer">Resume <ArrowIcon /></a>
          </div>
        </header>

        <main>
          <section className="command-hero" id="top" aria-labelledby="hero-title">
            <div className="hero-meta"><span>01 — introduction</span><span>backend / cloud / systems</span></div>
            <div className="hero-grid">
              <div className="hero-title">
                <p className="command-prefix"><span>$</span> whoami</p>
                <h1 id="hero-title">Sarvesh<br /><i>Patil</i></h1>
                <p className="hero-summary">I build the layers people depend on: APIs, control planes, developer tools, and cloud-native workflows.</p>
                <a className="hero-cta" href="#systems">Read the systems <ArrowIcon /></a>
              </div>
              <div className="hero-aside">
                <div className="aside-rule" />
                <p className="aside-label">operating mode</p>
                <p className="aside-copy">Not attached to one stack.<br /><strong>Attached to dependable systems.</strong></p>
                <div className="aside-stamp"><span>IND / open</span><span>MODE / systems</span></div>
              </div>
            </div>
            <div className="command-line"><span className="command-arrow">→</span><span>currently building</span><strong>Bridge</strong><span className="command-join">+</span><strong>AgentCargo</strong><span className="command-caret" aria-hidden="true">_</span><ExternalLink href="https://github.com/PatilSarvesh" className="command-link">inspect</ExternalLink></div>
          </section>

          <section className="signal-strip" aria-label="Working principles">
            <div className="signal-item"><span>01</span> explicit contracts</div>
            <div className="signal-item"><span>02</span> observable behavior</div>
            <div className="signal-item"><span>03</span> human authority</div>
            <div className="signal-item"><span>04</span> useful software</div>
          </section>

          <section className="work-section" id="systems" aria-labelledby="systems-title">
            <div className="content-frame">
              <div className="section-kicker"><span>01 / systems</span><span>latest work</span></div>
              <div className="section-intro"><h2 id="systems-title">Things I’m<br /><i>building.</i></h2><p>Four repositories in one direction: infrastructure that stays understandable as it grows.</p></div>
              <div className="system-grid">
                {systems.map((system) => (
                  <article className="system-card" key={system.name}>
                    <div className="system-top"><span>{system.number}</span><span className="system-status"><i /> {system.status}</span></div>
                    <h3>{system.name}</h3>
                    <p className="system-type">{system.type}</p>
                    <p className="system-description">{system.description}</p>
                    <div className="system-bottom"><div className="system-tags">{system.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="system-date">{system.updated}</span></div>
                    <ExternalLink href={system.url} className="system-open">open repository</ExternalLink>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="method-section" id="about" aria-labelledby="method-title">
            <div className="content-frame method-frame">
              <div className="section-kicker"><span>02 / method</span><span>how I think</span></div>
              <div className="method-layout">
                <h2 id="method-title">Make the behavior<br /><i>easy to trust.</i></h2>
                <div className="method-copy"><p>My current work is Python and AWS: cloud-native systems, automation, and operational reliability. My foundation is C# and .NET: architecture, APIs, contracts, and dependable delivery.</p><p>At the product edge, TypeScript, React, and Node.js turn those decisions into clear tools. The goal is always the same: useful software with humans in control.</p></div>
              </div>
              <div className="method-notes"><span>01</span><p>Clear contracts over hidden assumptions.</p><span>02</span><p>Security evidence over decorative trust scores.</p><span>03</span><p>Human authority over silent automation.</p></div>
            </div>
          </section>

          <section className="stack-section" id="now" aria-labelledby="stack-title">
            <div className="content-frame">
              <div className="section-kicker"><span>03 / stack</span><span>by responsibility</span></div>
              <div className="section-intro"><h2 id="stack-title">Use the right<br /><i>tool.</i></h2><p>A working toolkit, organized by the job each layer needs to do.</p></div>
              <div className="stack-list">{stack.map((item, index) => <div className="stack-row" key={item.label}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong><p>{item.value}</p></div>)}</div>
            </div>
          </section>

          <section className="contact-section" id="contact" aria-labelledby="contact-title">
            <div className="content-frame contact-frame">
              <div className="section-kicker"><span>04 / contact</span><span>open channel</span></div>
              <h2 id="contact-title">Have a layer<br /><i>to build?</i></h2>
              <p>I’m open to backend engineering conversations, thoughtful collaborations, and products that need a reliable foundation.</p>
              <div className="contact-links"><a className="contact-primary" href="mailto:p.sarvesh.1111@gmail.com">p.sarvesh.1111@gmail.com <ArrowIcon /></a><ExternalLink href="https://www.linkedin.com/in/patilsarvesh/">LinkedIn</ExternalLink></div>
            </div>
          </section>
        </main>

        <footer className="workbench-footer"><span>SP — dependable systems, useful software.</span><span>© {new Date().getFullYear()} Sarvesh Patil</span></footer>
      </div>
    </div>
  );
}

export default App;
