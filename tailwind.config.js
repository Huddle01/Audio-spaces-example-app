/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lobby: " #121212",
        audio: "#050505",
        custom: {
          1: " #23262F",
          2: "#121214",
          3: "#181A20",
          4: "#334155",
          5: "#CBD5E1",
          6: "#94A3B8",
        },
      },
    },
  },
  plugins: [],
};
