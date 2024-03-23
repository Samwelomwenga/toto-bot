import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        // Define your animation keyframes here
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        // Define your animation here
        "fade-in-right": "fade-in-right 0.7s ease-out",
      },
      colors: {
        "salmon": "#FA7C92",
        "rain": "#6EC4DB",
        "butter-milk": "#FFF7C0",
        "leaf":"#66AB8C",
        "bright-yellow":"#FAD94C",
        "grayish-brown":"#9C8075",
        "bright-orange":"#E76801",
        "yellow-green":"#63B201",
        "bluish-cyan":"#3A9AD9",
        "greenish-cyan":"##3EB489",
      },

      
        
    },
  },
  plugins: [],
};
export default config;
