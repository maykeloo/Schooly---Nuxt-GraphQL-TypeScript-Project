import { defineNuxtConfig} from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    apollo: {
        clientConfigs: {
          default: {
            httpEndpoint: 'http://localhost:4000',
          }
        }
    },
    build: {
        transpile: [
          '@apollo/client',
          'ts-invariant/process',
        ],
        loaders: {
          scss: {
            implementation: require('sass'),
          },
        },
    },
    buildModules: [
      '@nuxtjs/dotenv',
      '@nuxtjs/moment',
    ],
    css: [
      '@/assets/css/global.css'
    ],
    moment: {
      plugin: false
    }
})
