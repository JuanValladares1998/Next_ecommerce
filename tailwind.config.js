/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-orange": "#FF5722",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2563EB",
          secondary: "#22d3ee",
          accent: "#f43f5e",
          neutral: "#818cf8",
          "base-100": "#FFFFFF",
          info: "#4ade80",
          success: "#6EE7C7",
          warning: "#B18406",
          error: "#E95379",
        },
      },
    ],
  },
};
