// src/components/Experience.jsx
import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  FaExternalLinkAlt,
  FaTh,
  FaBars,
  FaDownload,
} from 'react-icons/fa';
import '../styles/Experience.css';

const experiences = [
  {
    id: 0,
    period: 'June 2023 — Present',
    title: 'Endpoint Security & Network Access Control Engineer',
    company: 'General Motors',
    logo: 'gm-logo.png',
    link: 'https://www.gm.com',
    description: `At General Motors, I lead the design, implementation, and upkeep of our enterprise endpoint security suite 🛡️—from antivirus and EDR to DLP technologies. I author and automate robust security scripts using Python, Bash, PowerShell, and C++ ⚙️, then continuously monitor network traffic and endpoint activity to detect and respond to threats in real time.`,
    tags: ['Python', 'Bash', 'PowerShell', 'C++', 'EDR'],
    details: [
      'Wrote a library of PowerShell modules to automate patch management across 10,000+ endpoints.',
      'Built a Python dashboard that visualized real-time EDR alerts for SOC analysts.',
      'Reduced incident response time by 30% through custom C++ integrations with our SIEM.',
    ],
  },
  {
    id: 1,
    period: 'July 2022 — June 2023',
    title: 'Endpoint Security & Network Identity Engineer',
    company: 'General Motors',
    logo: 'gm-logo.png',
    link: 'https://www.gm.com',
    description: `In this role, I architected and maintained our network identity management platform (Cisco ISE) 🔐—crafting policies and access controls that met rigorous compliance standards. I partnered with cross-functional teams to roll out secure authentication workflows and proactively hardened our systems against vulnerabilities.`,
    tags: ['CISCO ISE', 'Policies', 'Compliance'],
    details: [
      'Designed and deployed a certificate-based 802.1X rollout to 5,000+ devices.',
      'Authored network access policies reducing lateral movement risk by 40%.',
    ],
  },
  {
    id: 2,
    period: 'Feb 2022 — July 2022',
    title: 'Endpoint Security & Network Identity Engineer',
    company: 'General Motors',
    logo: 'gm-logo.png',
    link: 'https://www.gm.com',
    description: `During the initial rollout of our new security stack, I supported cross-functional teams by troubleshooting endpoint deployments and fine-tuning identity-access policies 🤝. I helped build runbooks, trained staff on secure configurations, and ensured a smooth migration.`,
    tags: ['Support', 'Troubleshooting'],
    details: [
      'Provided 24/7 on-call support, achieving 95% first-call resolution.',
      'Documented best practices and created internal training videos for new hires.',
    ],
  },
  // …add any additional entries here
];

export default function Experience() {
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const containerRef = useRef(null);
  const itemRefs = useRef([]);

  const allTags = useMemo(
    () => Array.from(new Set(experiences.flatMap(e => e.tags))),
    []
  );

  const filtered = useMemo(() => {
    return experiences
      .filter(e =>
        [e.title, e.company, e.description]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .filter(e => (activeTag ? e.tags.includes(activeTag) : true))
      .sort((a, b) => {
        const da = new Date(a.period.split('—')[0].trim()).getTime();
        const db = new Date(b.period.split('—')[0].trim()).getTime();
        return sortOrder === 'asc' ? da - db : db - da;
      });
  }, [search, activeTag, sortOrder]);

  // fade-in on scroll
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(ent => {
          if (ent.isIntersecting) {
            ent.target.classList.add('visible');
            obs.unobserve(ent.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    containerRef.current
      .querySelectorAll('.exp-item')
      .forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [filtered, viewMode]);

  // scroll expanded card into view
  useEffect(() => {
    if (openId !== null) {
      const idx = filtered.findIndex(e => e.id === openId);
      const el = itemRefs.current[idx];
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [openId, filtered]);

  return (
    <section id="experience" className="exp-section">
      <h2 className="exp-heading">Experience</h2>

      {/* Controls (centered & constrained) */}
      <div className="exp-controls">
        <input
          type="text"
          className="exp-search"
          placeholder="Search…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search experiences"
        />

        <div className="exp-filters">
          {allTags.map(tag => (
            <button
              key={tag}
              className={`exp-filter-pill ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(t => (t === tag ? null : tag))}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="exp-actions">
          <select
            className="exp-select"
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            aria-label="Sort order"
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>

          <button
            className="exp-view-toggle"
            onClick={() => setViewMode(v => (v === 'grid' ? 'list' : 'grid'))}
            aria-label="Toggle view mode"
          >
            {viewMode === 'grid' ? <FaBars /> : <FaTh />}
          </button>

          <a href="/cv.pdf" download className="exp-download">
            <FaDownload /> Download CV
          </a>
        </div>
      </div>

      {/* Experience grid (full-width) */}
      <div
        ref={containerRef}
        className={`exp-grid ${viewMode === 'list' ? 'list' : ''}`}
      >
        {filtered.map((exp, idx) => {
          const expanded = openId === exp.id;
          return (
            <div
              key={exp.id}
              ref={el => (itemRefs.current[idx] = el)}
              className={`exp-item ${expanded ? 'expanded' : ''}`}
            >
              <div className="exp-date">{exp.period}</div>
              <div className="exp-content">
                <div className="exp-title-row">
                  <img
                    src={`/logos/${exp.logo}`}
                    alt={`${exp.company} logo`}
                    className="exp-logo"
                    loading="lazy"
                  />
                  <h3 className="exp-title">{exp.title}</h3>
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exp-link"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>

                <p className="exp-desc">{exp.description}</p>

                <div className="exp-tags">
                  {exp.tags.map(t => (
                    <span className="exp-tag" key={t}>
                      {t}
                    </span>
                  ))}
                </div>

                {expanded && (
                  <ul className="exp-details">
                    {exp.details.map((d, j) => (
                      <li key={j}>{d}</li>
                    ))}
                  </ul>
                )}

                <button
                  className="exp-toggle"
                  onClick={() => setOpenId(expanded ? null : exp.id)}
                >
                  {expanded ? 'Show Less ▲' : 'Show More ▼'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
