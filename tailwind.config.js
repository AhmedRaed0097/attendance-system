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
      }
    },
  },
  prefix:'tw-',
  plugins: [],
}
