import React, { useEffect } from 'react';
import { useTheme } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

import Navbar from './fragments/Navbar';
import Header from './fragments/Header';
import Footer from './fragments/Footer';

import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Experience from './components/Experience';
import ContactMe from './components/ContactMe';
import ChatBot from './components/ChatBot'

import AOS from 'aos';
import './styles/App.css';

export default function App() {
  const { theme } = useTheme();
  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);


  return (
    <div
      className="
        App
        min-h-screen
        bg-[var(--color-bg)]
        text-[var(--color-text-primary)]
        transition-colors duration-300
      "
      aria-label={`Current theme is ${theme}`}
    >
      {/* Toggle control can live in your Header or Navbar */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <Header />
      <Navbar />
      <AboutMe />
      <ChatBot />
      <Projects />
      <Experience />
      <ContactMe />
      <Footer />
    </div>
  );
}
