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
      void: "#010000",
      black: "#191a1c",
      gray1: "#18171d",
      gray2: "#1a1a22",
      gray3: "#343434",
      gray4: "#737373",
      gray5: "#b6b6b6",
      gray6: "#eaeaea",
      gray7: "#f9f9f9",
      white: "#ffffff",
      transparent: "#00000000",

      // Brands
      discord: "#5865f2",
      twitter: "#1d9bf0",
      github: "#000000",
      reddit: "#ff4500",
      matrix: "#000000"
    },
    fontFamily: {
      sans: [
        "Satoshi",
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
    },
    scale: {
      "0": "0",
      "25": ".25",
      "50": ".5",
      "75": ".75",
      "90": ".9",
      "95": ".95",
      "100": "1",
      "1005": "1.005",
      "1010": "1.010",
      "1025": "1.025",
      "105": "1.05",
      "110": "1.1",
      "125": "1.25",
      "150": "1.5",
      "200": "2",
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      boxShadow: ["active"],
      border: ["active"],
      transform: ["group-hover"],
      translate: ["group-hover"],
      scale: ["group-hover"],
    }
  },
  plugins: [],
}