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
        // link: "linear-gradient(transparent 50%, theme(colors.link) 50%)",
      },
      boxShadow: {
        '3xl': '10px 10px 30px gray',
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
