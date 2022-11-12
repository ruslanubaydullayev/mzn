export default {
  loading: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: true,
  head: {
    title: 'mezinamiridici-ssr',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './assets/css/custom.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/loglevel.client.js',
    { src: '~/plugins/i18n.js', ssr: false },
    '~/plugins/vee-validate.js',
    '~/plugins/api.js',
    { src: '~/plugins/vue-datepicker', ssr: false },
  ],

  router: {
    prefetchLinks: false
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  axios: {
    baseURL: process.env.API_ENDPOINT,
  },

  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT,
    BFF_ENDPOINT: process.env.BFF_ENDPOINT
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    "@nuxtjs/svg",
    '@nuxtjs/moment',
    '@nuxt/postcss8',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/image',
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'bootstrap-vue/nuxt',
    '@nuxtjs/dotenv',
    'vue-social-sharing/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  // router: {
    // middleware: ['auth']
  // },

  auth: {
    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        codeChallengeMethod: '',
        responseType: 'code',
        // cope: ['profile', 'email'],
        endpoints: {
          token: process.env.BASE_URL + 'auth/google/', // somm backend url to resolve your auth with google and give you the token back
          userInfo: process.env.BASE_URL + 'author/profile/' // the endpoint to get the user info after you recived the token
        }
      },  
      facebook: {
        responseType: 'code',
        clientId: '620745295617467',
        endpoints: {
          token: process.env.BASE_URL + 'auth/facebook/',
          userInfo: process.env.BASE_URL + 'author/profile/'
        },
        scope: ['public_profile', 'email']
      },
    }
  },

  server: {
    port: 2712
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en', file: 'en.json' },
      { code: 'cs', iso: 'cs', file: 'cs.json' },
    ],
    defaultLocale: 'en',
    fallbackLocale: 'en',
    langDir: '~/locales/',
    strategy: 'no_prefix',
  },

  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false,
    icons: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
    postcss: {
      plugins: {
        autoprefixer: {},
      },
    },
  }
}
