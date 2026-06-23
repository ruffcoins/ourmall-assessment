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
          purple: "var(--brand-purple)",
          orange: "var(--brand-orange)",
          green: "#64c39c",
          yellow: "#ffdc00",
          blue: "#7ed3f6",
          grey: "#6e6e6e",
        }
      },
      fontFamily: {
        'geologica-light': ['Geologica_300Light', 'System'],
        'geologica-regular': ['Geologica_400Regular', 'System'],
        'geologica': ['Geologica_400Regular', 'System'],
        'geologica-medium': ['Geologica_500Medium', 'System'],
        'geologica-semibold': ['Geologica_600SemiBold', 'System'],
        'geologica-bold': ['Geologica_700Bold', 'System'],
        'geologica-black': ['Geologica_900Black', 'System'],
      }
    },
  },
  plugins: [],
}
