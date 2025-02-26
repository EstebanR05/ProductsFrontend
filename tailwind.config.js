import daisyui from "daisyui"
import daisyuiThemes from "daisyui/src/theming/themes"


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes["light"],
          "base-100": "#f7f7f7",
          "base-200": "#eaeaea",
          "base-300": "#e0e0e0",
          "base-content": "#2d3748",
          neutral: "#9ca3af",
          "neutral-content": "#1a202c",
          primary: "#3b82f6",
          "primary-content": "#ffffff",
          secondary: "#8b5cf6",
          accent: "#10b981",
          success: "#059669",
          warning: "#f59e0b",
          error: "#ef4444",
        },
        dark: {
          ...daisyuiThemes["dark"],
          "base-100": "#1e1e2a",
          "base-200": "#16161f",
          "base-300": "#0f0f16",
          "base-content": "#e2e8f0",
          neutral: "#4b5563",
          "neutral-content": "#f1f5f9",
          primary: "#60a5fa",
          "primary-content": "#1e1e2a",
          secondary: "#a78bfa",
          accent: "#34d399",
          success: "#10b981",
          warning: "#fbbf24",
          error: "#f87171",
        },
      },
    ],
  },
}

