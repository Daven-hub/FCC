/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
    },
    extend: {
      colors: {
        primary: "#006fba",     // Bleu foncé
        secondary: "#F39C12",   // Orange doré
        light: "#F8F8F8",       // Fond clair
        dark: "#1A1A1A",        // Texte foncé
        accent: "#3498DB",      // Bleu clair pour les détails
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        title: ["Playfair Display", "serif"],
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0, 0, 0, 0.05)",
      },
      screens: {
        xs: "420px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
}