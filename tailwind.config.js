module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
    theme: {
    extend: {
      fontFamily: {
        'cairo-light': ['Cairo-Light'],
        'cairo-bold': ['Cairo-Bold'],
        'lalezar': ['Lalezar'],
        'oswald-light': ['Oswald-Light'],
        'oswald-bold': ['Oswald-Bold'],
      },
      colors:{
        'primary':'#7C3E66',
        'secondary':'#f1b7dd'

      }
    },
    screens: {
      'sm': '600px',
      // => @media (min-width: 600px) { ... }
      'md': '960px',
      // => @media (min-width: 960px) { ... }
      'lg': '1264',
      // => @media (min-width: 1264px) { ... }
      'xl': '1904',
      // => @media (min-width: 1904px) { ... }
    },

  },
  prefix:'tw-',
  plugins: [],
}
