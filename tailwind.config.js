/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#7d50a0",
          orange: "#f56e41",
          green: "#64c39c",
          yellow: "#ffdc00",
          blue: "#7ed3f6",
          grey: "#6e6e6e",
        }
      },
      fontFamily: {
        'geologica-light': ['Geologica_300Light', 'System'],
        'geologica-medium': ['Geologica_500Medium', 'System'],
        'geologica-bold': ['Geologica_700Bold', 'System'],
      }
    },
  },
  plugins: [],
}
