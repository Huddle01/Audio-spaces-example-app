/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
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
          7: "#E2E8F0",
          8: "#246BFD",
        },
        rgbColors: {
          1: "rgba(24, 24, 27, 0.8)",
          2: "rgba(71, 85, 105, 0.2)",
          3: "rgba(148, 163, 184, 1)",
          4: "rgba(249, 112, 102, 0.1)",
        },
      },
    },
  },
  plugins: [],
};
