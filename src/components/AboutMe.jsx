// src/components/AboutMe.jsx

import React, { useState, useEffect, memo, useCallback} from 'react';
import '../styles/AboutMe.css';
import { motion } from 'framer-motion';

// 1) import your PNGs
import blueTeamBadge from '../assets/badges/blue-team.png';
import cctBadge      from '../assets/badges/cct-routing.png';
import azureBadge    from '../assets/badges/azure-fundamentals.png';

// 2) BadgeItem now calls onSelect instead of window.open
const BadgeItem = memo(({ title, imgSrc, url, isDarkLogo, onSelect }) => {
  const extraClass = isDarkLogo ? ' dark-logo' : '';
  return (
    <div
      className={`badge-item${extraClass}`}
      onClick={() => onSelect({ title, imgSrc, url })}
      role="button"
      tabIndex={0}
      onKeyPress={e => e.key === 'Enter' && onSelect({ title, imgSrc, url })}
      title={title}
    >
      <img src={imgSrc} alt={title} className="badge-img" loading="lazy" />
    </div>
  );
});


export default function AboutMe() {
  // rotating descriptor words
  const descriptors = ["developer", "designer", "problem solver", "creator"];
  const [idx, setIdx] = useState(0);

  // PNG badges + URLs + dark-logo flag
  const badges = [
    {
      title:     "Blue Team Level 1",
      imgSrc:    blueTeamBadge,
      url:       'https://www.credly.com/badges/5cab8576-afbd-4f81-a19e-c0a750d069f7',
      isDarkLogo:false
    },
    {
      title:     "CCT Routing & Switching",
      imgSrc:    cctBadge,
      url:       'https://www.credly.com/badges/67f93061-ef60-452d-bce9-f463af3a73a1',
      isDarkLogo:true
    },
    {
      title:     "Azure Fundamentals",
      imgSrc:    azureBadge,
      url:       'https://www.credly.com/badges/ec8ad48f-061c-4b26-a07b-3e12cd6d482a',
      isDarkLogo:false
    },
  ];

    // **NEW**: contact‐form state
  const [showEmailForm, setShowEmailForm]         = useState(false);
  const [showLinkedInForm, setShowLinkedInForm]   = useState(false);

  
  // copy‐to‐clipboard helper
  const copyText = useCallback(text => {
    navigator.clipboard.writeText(text);
  },[]);

  // 3) Modal state & handlers
  const [modalBadge, setModalBadge] = useState(null);
  const openBadgeModal  = badge => setModalBadge(badge);
  const closeBadgeModal = ()    => setModalBadge(null);

  // Load Credly script once (unchanged)
  useEffect(() => {
    const src = "https://cdn.credly.com/assets/utilities/embed.js";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src; s.async = true;
      s.onload = () => window.CredlyEmbed?.init();
      document.body.appendChild(s);
    } else {
      window.CredlyEmbed?.init();
    }
  }, [badges]);

  // Cycle descriptor every 2s (unchanged)
  useEffect(() => {
    const iv = setInterval(() => {
      setIdx(i => (i + 1) % descriptors.length);
    }, 2000);
    return () => clearInterval(iv);
  }, [descriptors.length]);

  // Framer variants (unchanged)
  const sentence = {
    hidden:  { opacity: 1 },
    visible:{ opacity: 1, transition: { delay: 0.5, staggerChildren: 0.08 } }
  };
  const letter = {
    hidden:  { opacity: 0, y: 50 },
    visible:{ opacity: 1, y: 0, transition:{ type:'spring', damping:12, stiffness:100 } }
  };


  // handlers for contact forms
  const handleEmailSubmit = e => {
    e.preventDefault();
    const subject = e.target.subject.value;
    const body    = e.target.body.value;
    window.location.href = `mailto:angesh021@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setShowEmailForm(false);
  };

  const handleLinkedInSubmit = e => {
    e.preventDefault();
    // here you could inject the message into a LinkedIn deep-link,
    // but for now we'll just open your profile page
    window.open('https://www.linkedin.com/in/angesh-chanderdip/', '_blank');
    setShowLinkedInForm(false);
  };

  return (
    <>
      <section
        id="about-me"
        className="about-me d-flex justify-content-center align-items-start"
      >
        <div className="container h-100">
          <div className="row gx-5 align-items-center h-100">
            {/* Left Column: Profile + Social */}
            <div className="col-12 col-lg-5 d-flex flex-column align-items-center">
              {/* Profile Card */}
              <div className="profile-card">
                <div className="profile-card-inner">
                  <img
                    src={require('../assets/profile.png')}
                    alt="Profile"
                    className="profile-pic"
                  />
                  <div className="profile-details">
                    <div className="availability-status">
                      <span className="status-dot" /> Available for work
                    </div>
                    <h1 className="profile-name">Angesh Kumar Chanderdip</h1>
                    <p className="profile-title">
                      Software Engineer at General Motors
                    </p>
                    <div className="contact-info">
  <p>
    <i
      className="fas fa-copy copy-icon"
      title="Copy Instagram handle"
      onClick={() => copyText('@IGhandle')}
      role="button"
    />
    <i className="fab fa-instagram" aria-hidden="true" />
    <span>@IGhandle</span>
  </p>
  <p>
    <i
      className="fas fa-copy copy-icon"
      title="Copy phone number"
      onClick={() => copyText('+44 1234 9875')}
      role="button"
    />
    <i className="fas fa-phone" aria-hidden="true" />
    <span>+44 1234 9875</span>
  </p>
  <p>
    <i
      className="fas fa-copy copy-icon"
      title="Copy email"
      onClick={() => copyText('angesh021@gmail.com')}
      role="button"
    />
    <i
      className="fas fa-envelope contact-icon"
      title="Send email"
      onClick={() => setShowEmailForm(true)}
      role="button"
    />
    <span>angesh021@gmail.com</span>
  </p>
</div>

                  </div>
                </div>
              </div>
              {/* Social Icons Card */}
              <div className="social-card">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>

            {/* Right Column: About & Badges */}
            <div className="col-12 col-lg-6 offset-lg-1 d-flex flex-column justify-content-center">
              <motion.h2
                className="about-heading"
                initial="hidden"
                animate="visible"
                variants={sentence}
              >
                {Array.from('About Me').map((char, i) => (
                  <motion.span key={i} variants={letter}>
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </motion.h2>
              <motion.div
                className="about-description"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <p>
                  Hello! I’m a passionate{' '}
                  <span className="dynamic-word">{descriptors[idx]}</span>{' '}
                  who loves working with modern web technologies. Over the years, I
                  have built scalable web applications and crafted intuitive user
                  experiences. I’m always eager to learn and contribute to
                  innovative projects.
                </p>
                <p>
                  With a strong foundation in front-end and back-end development,
                  I’m seeking new challenges where I can apply my skills and
                  continue growing as a developer.
                </p>
              </motion.div>

              {/* Certifications & Badges */}
              <motion.div
                className="badges-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                <h3 className="badges-heading"></h3>
                <div className="badges-container">
                  {badges.map(b => (
                    <BadgeItem
                      key={b.url}
                      title={b.title}
                      imgSrc={b.imgSrc}
                      url={b.url}
                      isDarkLogo={b.isDarkLogo}
                      onSelect={openBadgeModal}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Modal */}
      {modalBadge && (
        <div className="badge-modal-overlay" onClick={closeBadgeModal}>
          <div
            className="badge-modal-content"
            onClick={e => e.stopPropagation()}
          >
            <div className="badge-modal-close" onClick={closeBadgeModal}>
              &times;
            </div>
            <img
              src={modalBadge.imgSrc}
              alt={modalBadge.title}
              loading="lazy"
            />
            <h4>{modalBadge.title}</h4>
            <a
              href={modalBadge.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Credly
            </a>
          </div>
        </div>
      )}
    </>
  );
}
