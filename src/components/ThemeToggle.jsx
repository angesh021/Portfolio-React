// src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Accessible toggle switch for light/dark mode.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="
        p-2 rounded-full focus:outline-none
        bg-[var(--color-surface)] text-[var(--color-text-primary)]
        hover:bg-[var(--color-surface)]/90
        transition
      "
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
