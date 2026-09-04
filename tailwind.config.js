/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./context/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1b4ea4",
          light: "#3a6fc4",
          dark: "#123a7d",
          50: "#eef4fc",
          100: "#dbe7f9",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "Inter", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(27, 78, 164, 0.18)",
        softHover: "0 16px 40px -12px rgba(27, 78, 164, 0.28)",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
