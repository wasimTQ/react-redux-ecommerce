module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        accent: '#C62725',
        secondary: '#FFEFDD',
        
      },
      height: {
        large: '90%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
