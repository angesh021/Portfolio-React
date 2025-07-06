import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Create the context
const ThemeContext = createContext();

/**
 * ThemeProvider wraps your app,
 * manages the current theme state,
 * and updates <html> attributes.
 */
export function ThemeProvider({ children }) {
  // 2. Initialize from localStorage or default to 'light'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // 3. When `theme` changes, update <html> and persist
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') root.classList.add('dark');
    else               root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 4. Toggle function
  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Hook for consuming theme context */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
