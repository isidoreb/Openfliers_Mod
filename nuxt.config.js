export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'ACBB - 20 heures',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },

      { name: 'author', content: 'Lucid – wearelucid.ch' }
    ]
  },

  /*
   ** CSS
   */
  css: ['normalize.css', '@/assets/css/main.scss'],

  /*
   ** Plugins
   */
  plugins: ['~/plugins/20heures'],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],

  /*
   ** Modules
   */
  modules: ['@nuxtjs/axios'],

  /*
   ** Axios config
   */
  axios: {
    baseURL: '/'
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
