const baseFont = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Open Sans",
  "Helvetica Neue",
  "sans-serif"
]

module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: false, // or "media" or "class"
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      lg2: "1280px",
      xl: "1920px",
    },
    colors: {
      red: "#F64242",
      orange: "#FF7A00",
      yellow: "#FFCC32",
      green: "#0DD762",
      neon: "#00FFB7",
      blue: "#1662D3",
      violet: "#742CD0",
      pink: "#C32CD0",
      madder: "#D02C67",
      bingus: "#CF9B90",
      black: "#191A1C",
      gray1: "#18171D",
      gray2: "#1A1A22",
      gray3: "#343434",
      gray4: "#737373",
      gray5: "#B6B6B6",
      gray6: "#EAEAEA",
      gray7: "#F9F9F9",
      white: "#FFFFFF",
      transparent: "#00000000"
    },
    fontFamily: {
      sans: [
        "Karla",
        ...baseFont
      ]
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    }
  },
  plugins: [],
}
