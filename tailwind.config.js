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
        'float': 'float 20s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'border-rotate': 'border-rotate 2s linear 2',
        'border-highlight': 'border-highlight 2s ease-in-out',
        'border-pulse': 'border-pulse 2s ease-in-out',
        'border-spin': 'border-spin 3s linear infinite',
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
          '0%, 100%': { 
            transform: 'translate(0px, 0px) rotate(0deg)'
          },
          '20%': {
            transform: 'translate(-4px, -8px) rotate(-1deg)'
          },
          '40%': {
            transform: 'translate(4px, -4px) rotate(1deg)'
          },
          '60%': {
            transform: 'translate(-6px, -2px) rotate(0deg)'
          },
          '80%': {
            transform: 'translate(2px, -6px) rotate(1deg)'
          }
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        pulse: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.15' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'border-rotate': {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        },
        'border-highlight': {
          '0%': {
            transform: 'scale(1.2)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '0',
          },
        },
        'border-pulse': {
          '0%': {
            transform: 'scale(1.2)',
            opacity: '0',
          },
          '50%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '0',
          },
        },
        'border-spin': {
          'from': {
            transform: 'rotate(0deg)',
          },
          'to': {
            transform: 'rotate(360deg)',
          }
        },
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
  safelist: [
    {
      pattern: /text-\[#([0-9a-fA-F]{6})\]/,
    }
  ],
}
