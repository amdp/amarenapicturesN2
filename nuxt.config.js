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
  modules: ['@nuxtjs/axios', '@nuxtjs/toast', 'bootstrap-vue/nuxt', '@nuxtjs/auth', 'nuxt-i18n'],
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
