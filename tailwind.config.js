module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}", 
    "./src/components/**/*.{js,ts,jsx,tsx}"
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
      red: "#f64242",
      orange: "#ff7a00",
      yellow: "#ffcc32",
      green: "#0dd762",
      neon: "#00ffb7",
      blue: "#1662d3",
      bluelight: "#f4f8fe",
      violet: "#742cd0",
      pink: "#c32cd0",
      madder: "#d02c67",
      bingus: "#cf9b90",
      pureblack: "#09090a",
      black: "#191a1c",
      gray1: "#18171d",
      gray2: "#1a1a22",
      gray3: "#343434",
      gray4: "#737373",
      gray5: "#b6b6b6",
      gray6: "#eaeaea",
      gray7: "#f9f9f9",
      white: "#ffffff",
      transparent: "#00000000"
    },
    fontFamily: {
      sans: [
        "Karla",
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
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    }
  },
  plugins: [],
}