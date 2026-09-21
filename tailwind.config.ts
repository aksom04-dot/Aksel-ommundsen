import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        marine: {
          900: "#0B1B2B",
          700: "#0F2A4A",
          500: "#1B3F6B",
          100: "#E4ECF6",
        },
        gul: {
          500: "#FFC72C",
          100: "#FFF6DC",
        },
        status: {
          "gronn-bg": "#DCFCE7",
          "gronn-tekst": "#15803D",
          "amber-bg": "#FEF3C7",
          "amber-tekst": "#B45309",
          "rod-bg": "#FEE2E2",
          "rod-tekst": "#B91C1C",
        },
        bakgrunn: "#F5F8FC",
        graa: {
          600: "#5B6B7C",
        },
      },
      fontSize: {
        senior: ["24px", { lineHeight: "1.4" }],
        "senior-lg": ["28px", { lineHeight: "1.4" }],
      },
      minHeight: {
        knapp: "80px",
      },
    },
  },
  plugins: [],
};

export default config;
