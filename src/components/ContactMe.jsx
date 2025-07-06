import React from 'react';
import '../styles/ContactMe.css'; // Make sure the CSS file is correctly referenced
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa'; // Importing icons from react-icons

const ContactPage = () => {
  return (
    <section id="contact" className="contact-page">
      <div className="mac-window">
        <div className="mac-title-bar">
          <div className="mac-buttons">
            <span className="mac-btn close"></span>
            <span className="mac-btn minimize"></span>
            <span className="mac-btn maximize"></span>
          </div>
        </div>

        <div className="contact-container">
          <h1 className="contact-title">Contact Me</h1>
          <form className="contact-form">
            <div className="form-group">
              <FaUser className="input-icon" />
              <input type="text" id="name" required />
              <label htmlFor="name" className="form-label">Your Name</label>
            </div>
            <div className="form-group">
              <FaEnvelope className="input-icon" />
              <input type="email" id="email" required />
              <label htmlFor="email" className="form-label">Your Email</label>
            </div>
            <div className="form-group">
              <FaCommentDots className="input-icon" />
              <textarea id="message" required></textarea>
              <label htmlFor="message" className="form-label">Your Message</label>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
