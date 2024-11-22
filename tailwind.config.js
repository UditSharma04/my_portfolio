/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#7477FF",
        tertiary: "#1e293b",
        accent: "#7477FF",
        'accent-light': "#8F91FF",
        'accent-dark': "#5A5DFF",
        textPrimary: "#e2e8f0",
        textSecondary: "#94a3b8",
      },
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
      },
      backgroundColor: {
        'dark': '#0f172a',
        'card': '#1e293b',
      },
      animation: {
        blob: "blob 7s infinite",
        'border-width': 'border-width 3s infinite',
        bounce: 'bounce 1s infinite',
        blink: 'blink 1s step-end infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        'border-width': {
          'from': { width: '10px', opacity: '0' },
          'to': { width: '100%', opacity: '1' }
        },
        blink: {
          'from, to': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      },
      transitionDelay: {
        '2000': '2000ms',
        '4000': '4000ms',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'neon': '0 0 5px theme("colors.accent.DEFAULT"), 0 0 20px theme("colors.accent.DEFAULT")',
      }
    },
  },
  plugins: [],
}
