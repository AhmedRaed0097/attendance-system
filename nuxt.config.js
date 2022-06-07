import colors from 'vuetify/es5/util/colors'

export default {

  ssr: false,
// test
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - attendance-pwa-app',
    title: 'attendance-pwa-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vue-html2pdf', mode: 'client' }
    // { src: '~/plugins/qrCode', mode: 'client', ssr: false },
  ],

server:{
  host:'0.0.0.0',
  port:3000
},

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/postcss8',
    // 'nuxt-vite'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // baseURL: 'http://192.168.55.120:8000/api/',
    baseURL: 'http://127.0.0.1:8000/api',
    // baseURL: 'https://students-attendance-api.herokuapp.com/api/',
  },

  router: {
    middleware: ['auth']
  },
  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: '/auth/login',
      home: '/auth/login'

    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'data.token'
          },
          logout: false
          ,
          // logout: {
          //   url: '/logout',
          //   method: 'post',
          // },
          user: {
            url: '/user',
            method: 'get',
            propertyName: 'data.user'
          }
        }
      }
    },
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   manifest: {
  //     lang: 'en',
  //   },
  // },
  pwa: {
    meta: {
      title: 'QR students attendance',
      author: 'Ahmed Raed',
    },
    icons: {
      /* icon options */
      iconFileName:  'icon.png'
    },
    manifest: {
      name: 'QR Students Attendance',
      short_name: 'QR Attendance',
      lang: 'ar',
      display: 'standalone'
    },
    workbox: {
      cachingExtensions: '@/plugins/workbox-sync.js',
      enabled: true //should be off actually per workbox docs due to complications when used in prod
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
}
