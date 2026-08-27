/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Field-green accent scale (was blue) so every existing primary-*
        // usage picks up the sideline identity.
        primary: {
          50: '#ECF5F0',
          100: '#D6EAE0',
          400: '#2E8168',
          500: '#1B6A52',
          600: '#14503E',
          700: '#0E3B2E',
          900: '#0B2F25',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        },
        field: {
          900: '#0B2F25',
          800: '#0E3B2E',
          700: '#14503E',
          600: '#1B6A52',
        },
        chalk: '#F2EFE6',
        gold: {
          400: '#E3B45C',
          500: '#D9A441',
          600: '#B98730',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Barlow Condensed"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}