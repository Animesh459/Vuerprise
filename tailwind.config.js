import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            dm: ['DM Sans', ...defaultTheme.fontFamily.sans],
        },
      colors: {
        'bg-primary': '#ffffff',
        'text-primary': '#000000',
        'header-bg': '#f8f9fa',
        'header-text': '#000000',
        'table-header-bg': '#e9ecef',
        'table-header-text': '#000000',
        'table-row-even-bg': '#f8f9fa',
        'table-row-odd-bg': '#ffffff',
        'border-primary': '#dee2e6',
        'button-primary-bg': '#007bff',
        'button-primary-text': '#ffffff',
        'button-secondary-bg': '#6c757d',
        'button-secondary-text': '#ffffff',
        'dark-bg-primary': '#1a1f2e',
        'dark-text-primary': '#ffffff',
        'dark-header-bg': '#1a1f2e',
        'dark-header-text': '#ffffff',
        'dark-table-header-bg': '#374151',
        'dark-table-header-text': '#ffffff',
        'dark-table-row-even-bg': '#1f2937',
        'dark-table-row-odd-bg': '#1a1f2e',
        'dark-border-primary': '#374151',
        'dark-button-primary-bg': '#2563eb',
        'dark-button-primary-text': '#ffffff',
        'dark-button-secondary-bg': '#4b5563',
        'dark-button-secondary-text': '#ffffff',
      }
    },
  },
  plugins: [],
}