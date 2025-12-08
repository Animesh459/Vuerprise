import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

        colors: {
            'main-bg': '#0D121C',
            'primary': 'var(--text-primary)',
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
          },
            // fontSize: {
            //     // Class: text-xs-2, Size: 0.75rem, Line Height: 1rem
            //     'font-16': '16px',
            //     'font-18': '18px',
            //     'font-22': '22px',
            //     'xxl': ['1.75rem', { lineHeight: '2rem' }],
            //     'huge': ['6rem', {
            //         lineHeight: '1',
            //         letterSpacing: '-0.02em',
            //         fontWeight: '700',
            //     }],
            // },
    },
  },
  plugins: [],
}