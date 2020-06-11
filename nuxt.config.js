const pkg = require('./package')
require('dotenv').config()
import fs from 'fs'
import path from 'path'
import en from './t/en.json'
import it from './t/it.json'
module.exports = {
  mode: 'universal',
  plugins: [],
  build: {},
  serverMiddleware: ['./api'],
  css: ['@assets/amarena.scss'],
  modules: ['@nuxtjs/axios', '@nuxtjs/toast', 'bootstrap-vue/nuxt', '@nuxtjs/auth', 'nuxt-i18n', ['@nuxtjs/google-analytics', { id: 'UA-53354338-1' }]],
  loading: {
    color: '#FF0033',
    failedColor: 'black',
    height: '3px',
    continuous: true
  },
  env: {
    DBURL: process.env.DBURL,
    RECAPTCHA: process.env.RECAPTCHA,
    URLHOME: process.env.URLHOME
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
    script: [
      //{ src: 'linkedin.js' },
    ],
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      { hid: 'description', name: 'description', content: pkg.description },
      { property: 'og:desc', content: 'That\'s Amarena! Founded by directors Alessandro Merletti De Palo and Giovanni Caloro, Amarena Pictures combines the art of film direction with solid, cutting-edge production.' },
      { property: 'og:title', content: 'Amarena Pictures' },
      { property: 'og:image', content: '@assets/amarenasquare.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Oswald:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap'
      },
    ]
  },
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: en,
        it: it,
      }
    }
  },
  plugins: [
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'token.accessToken'
          },
          logout: { url: '/logout', method: 'post' },
          user: { url: '/user', method: 'get', propertyName: 'user' }
        }
      }
    },
    redirect: {
      home: '/',
      login: '/',
      user: '/',
      logout: '/'
    }
  }
}
