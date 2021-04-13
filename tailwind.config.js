module.exports = {
  purge: {
    enabled: true,
    content: ['./Templates/**/*.html', './static/**/*.js'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      logo: ['Swanky and Moo Moo', 'cursive'],
      hero_font: ['Comfortaa', 'cursive'],
      primary: ['Poppins', 'sans-serif'],
    },
    boxShadow: {
      '3xl': ' 0px 0px 5px rgba(0, 0, 0, 0.125)',
    },

    extend: {
      colors: {
        'primary-green': '#c6d5c5',
        'primary-teal': '#8dbdc0',
        'primary-dark-gray': '#393b3c7a',
      },
    },
    variants: {
      extend: {
        borderColor: ['hover'],
      },
    },
    plugins: [],
  },
};
