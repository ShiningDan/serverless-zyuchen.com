module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'serverless-zyuchen.com',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'serverless project for zyuchen.com blog' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    { src: '~plugins/element-ui', ssr: true }
  ],
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'element-ui'
    ],
    babel: {
      "plugins": [["component", {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        },
        'transform-async-to-generator',
        'transform-runtime'
      ]],
      comments: true
    }
  }
}
