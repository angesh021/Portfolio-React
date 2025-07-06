/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg:               'var(--color-bg)',
        surface:          'var(--color-surface)',
        'text-primary':   'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        primary:          'var(--color-primary)',
        secondary:        'var(--color-secondary)',
        accent:           'var(--color-accent)',
        error:            'var(--color-error)',
      },
    },
  },
  plugins: [],
};
