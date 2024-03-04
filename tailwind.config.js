module.exports = {
  purge: [],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    screens: {
      ">sm": "640px",
      // => @media (min-width: 640px) { ... }

      ">md": "768px",
      // => @media (min-width: 768px) { ... }

      ">lg": "1024px",
      // => @media (min-width: 1024px) { ... }

      ">xl": "1280px",
      // => @media (min-width: 1280px) { ... }

      ">2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "<2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      "<xl": { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      "<lg": { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      "<md": { max: "767px" },
      // => @media (max-width: 767px) { ... }

      "<sm": { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      transitionProperty: {
        "max-height": "max-height",
      },
      maxHeight: {
        inf: `10000px`,
      },
      backgroundColor: {
        submit: "#3b3b3b",
        "submit-hover": "#6b6b6b",
        background: {
          light: "#f3f3f3",
          dark: "#1f1f1f",
        },
      },
      textColor: {
        error: "rgba(220, 38, 38, 1)",
      },
    },
  },
  variants: {
    extend: {
      fill: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
