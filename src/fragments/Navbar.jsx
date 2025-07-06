import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Navbar.css';

export default function Navbar() {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const { theme } = useTheme();
  const toggleSettings = () => setIsSettingsVisible(v => !v);

  return (
    <div className="navbar-container">
      <motion.nav
        className="custom-navbar position-fixed d-flex align-items-center justify-content-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <ul className="nav mb-0">
          <li className="nav-item">
            <a className="nav-link p-0" href="#about-me">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link p-0" href="#project">Project</a>
          </li>
          <li className="nav-item">
            <a className="nav-link p-0" href="#experience">Experience</a>
          </li>
          <li className="nav-item">
            <a className="nav-link p-0" href="#contact">Contact</a>
          </li>
          <li className="nav-item">
            <div className="vr custom-divider" style={{ height: '20px' }} />
          </li>

          {/* Gear + Settings */}
          <li className="nav-item">
            <button
              className={`gear-button btn btn-link p-0 ${isSettingsVisible ? 'active' : ''}`}
              onClick={toggleSettings}
              aria-label="Settings"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/settings.png"
                alt="settings-icon"
                width="20"
                height="20"
              />
            </button>

            <AnimatePresence>
              {isSettingsVisible && (
                <motion.div
                  className="custom-settings-panel"
                  initial={{ scaleY: 0, opacity: 0, x: '-50%' }}
                  animate={{ scaleY: 1, opacity: 1, x: '-50%' }}
                  exit={{ scaleY: 0, opacity: 0, x: '-50%' }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center settings-header">
                    <h5 className="mb-0 d-flex align-items-center text-body">
                      <img
                        src="https://img.icons8.com/ios-filled/50/ffffff/settings.png"
                        alt="settings-icon"
                        width="16"
                        height="16"
                        className="me-2"
                      />
                      Settings
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={toggleSettings}
                    />
                  </div>

                  {/* Description */}
                  <div className="settings-description">
                    Adjust your settings below.
                  </div>

                  {/* Controls side-by-side */}
                  <div className="settings-options">
                    {/* Theme */}
                    <div className="option">
                      <label htmlFor="theme-toggle">Theme</label>
                      <ThemeToggle id="theme-toggle" />
                    </div>
                    {/* 3D Elements */}
                    <div className="option">
                      <label htmlFor="threed-select">3D Elements</label>
                      <select
                        id="threed-select"
                        defaultValue="on"
                        className="form-select form-select-sm"
                      >
                        <option value="on">📦 On</option>
                        <option value="off">📦 Off</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </motion.nav>
    </div>
  );
}
