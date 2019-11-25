const pkg = require('./package')
require('dotenv').config()
import fs from 'fs'
import path from 'path'
module.exports = {
  mode: 'universal',
  plugins: [],
  build: {},
  serverMiddleware: ['./api'],
  css: ['@assets/amarena.css'],
  modules: ['@nuxtjs/axios', '@nuxtjs/toast', 'bootstrap-vue/nuxt'],
  loading: {
    color: '#FF0033',
    failedColor: 'black',
    height: '3px',
    continuous: true
  },
  env: {
    DBURL: process.env.DBURL,
    RECAPTCHA: process.env.RECAPTCHA
  },
  axios: {
    https: process.env.HTTPS ? true : false,
    baseURL: process.env.DBURL
  },
  server: process.env.HTTPS
    ? {
        port: process.env.PORT,
        host: process.env.HOST,
        https: {
          key: fs.readFileSync(
            path.resolve(process.env.HTTPSDIR, process.env.HTTPSKEY)
          ),
          cert: fs.readFileSync(
            path.resolve(process.env.HTTPSDIR, process.env.HTTPSCERT)
          )
        }
      }
    : { host: process.env.HOST, port: process.env.PORT },

  head: {
    title: 'Amarena Pictures',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Oswald:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap'
      }
    ]
  }
}
