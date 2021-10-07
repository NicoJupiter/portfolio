export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'portfolio',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600&display=swap"}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/main.scss'
  ],

  styleResources: {
    scss: [
      'assets/scss/_variables.scss',
      'assets/scss/utils/_mixins.scss',
      'assets/scss/utils/_responsive.scss',
      'assets/scss/_global.scss'
    ]
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',

  ],

  module: {
    loaders: [
      {
        test: /\.glsl$/,
        loader: 'webpack-glsl'
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      'three'
    ]
    /*env: {
      baseUrl: process.env.BASE_URL || "https://portfolio-55714-default-rtdb.firebaseio.com"
    }*/
  },
  loading: '~/components/Loaders/TransitionLoader.vue',
  target: 'static'
}
