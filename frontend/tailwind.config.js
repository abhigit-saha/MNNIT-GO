// tailwind.config.js
module.exports = {
  content: [
    "./index.html",          // Include the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JavaScript, TypeScript, JSX, and TSX files in src folder
  ],
  theme: {
    extend: {
      colors: {
        backgroundDark: '#130614', // Your dark background color
        panelDark: '#1b0b20', // Dark panel color
        neonPink: '#f555e0',
        neonPurple: '#9b51e0',
        textLight: '#E5E7EB',
        neonGreen: '#39FF14',
        neonYellow: '#FFDD33',
        neonRed: '#FF3131',
      },
      boxShadow: {
        neon: '0px 0px 15px rgba(245, 85, 224, 0.3)', // Soft neon shadow
        neonGlow: '0px 0px 20px rgba(245, 85, 224, 0.6)', // Strong neon glow
      },
      animation: {
        'pulse-glow': 'pulse 1.5s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
