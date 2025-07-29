/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Add this line to scan all JS/JSX files
    "./public/index.html"           // Add your HTML file if needed
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#f3f4f6',  // Example custom color
      }
    },
  },
  plugins: [],
}

