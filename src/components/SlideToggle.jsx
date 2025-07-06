import React from 'react';

/**
 * A reusable slide-toggle switch.
 *
 * Props:
 * - id        (string): HTML id for the checkbox
 * - checked   (bool):   whether toggle is on
 * - onChange  (func):   callback when toggled
 * - ariaLabel (string): for accessibility
 */
export default function SlideToggle({ id, checked, onChange, ariaLabel }) {
  return (
    <label htmlFor={id} className="relative inline-block w-12 h-6 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
      />
      {/* Track */}
      <div
        className="
          w-full h-full
          bg-gray-200 dark:bg-gray-600
          rounded-full
          peer-focus:ring-2 peer-focus:ring-[var(--color-accent)]
          peer-checked:bg-[var(--color-primary)]
          transition-colors duration-300
        "
      />
      {/* Thumb */}
      <div
        className="
          absolute top-1 left-1
          w-4 h-4
          bg-white dark:bg-gray-100
          rounded-full
          peer-checked:translate-x-6
          transition-transform duration-300
        "
      />
    </label>
  );
}
