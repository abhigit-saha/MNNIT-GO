module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: '#24263A',  // Background dark color
        primaryText: '#E5E7EB',  // Light text color
        highlight: '#F472B6',    // Pink button highlight color
      },
    },
  },
  plugins: [],
};
