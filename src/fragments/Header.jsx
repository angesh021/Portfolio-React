import React, { useState, useEffect } from 'react';
import '../styles/Header.css'; // Ensure CSS file is linked

const Header = () => {
  const [isInAboutSection, setIsInAboutSection] = useState(false);

  useEffect(() => {
    const appContainer = document.querySelector('.App'); // Select the scrollable container

    const handleScroll = () => {
      const aboutSection = document.querySelector('#about'); // Ensure the about section exists
      if (!aboutSection) return; // If the section doesn't exist, return early to avoid errors

      const aboutSectionTop = aboutSection.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      // Check if "About Me" section is in view
      if (aboutSectionTop >= 0 && aboutSectionTop < viewportHeight) {
        setIsInAboutSection(true); // Show header when in "About Me" section
      } else {
        setIsInAboutSection(false); // Hide header otherwise
      }
    };

    appContainer.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => appContainer.removeEventListener('scroll', handleScroll);
  }, []);

  // Render the header only when the user is in the "About Me" section
  if (!isInAboutSection) {
    return null;
  }

  return (
    <header className="header visible">
      {/* Signature */}
      <div className="signature">Angesh Chanderdip</div>

      {/* Download CV Button */}
      <div className="download-cv">
        Download CV
        <i className="fas fa-download"></i> {/* Font Awesome icon */}
      </div>
    </header>
  );
};

export default Header;
