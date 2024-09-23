/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Quattro", "sans-serif"],
      body: ["Quattro", "sans-serif"],
      heading: ["Recoleta", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        hr: "linear-gradient(to right, theme(colors.bg / 75%), theme(colors.primary), theme(colors.bg / 75%))",
        link: "linear-gradient(transparent 50%, theme(colors.link) 50%)",
      },
      boxShadow: {
        '3xl': '5px 5px 40px -10px gray',
        smooth: '0 2.8px 2.2px rgba(0, 0, 0, 0.034),0 6.7px 5.3px rgba(0, 0, 0, 0.048),0 12.5px 10px rgba(0, 0, 0, 0.06),0 22.3px 17.9px rgba(0, 0, 0, 0.072),0 41.8px 33.4px rgba(0, 0, 0, 0.086),0 100px 80px rgba(0, 0, 0, 0.12)'
      },
      backdropBlur: {
        xs: '7px',
      },
      textUnderlineOffset: {
        30: '-0.5rem',
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: 'rgb(var(--color-primary))',
      secondary: 'rgb(var(--color-secondary))',
      link: 'rgb(var(--color-link))',
      'link-contrast': 'rgb(var(--color-link-contrast))',
      bg: 'rgb(var(--color-bg))',
    }
  },
  plugins: [],
}
