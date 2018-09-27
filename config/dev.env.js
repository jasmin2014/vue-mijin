'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  'process.env': {
    NODE_ENV: '"development"'
  },
  APP_ID: '"uc83be9ad9293507e5"',
  APP_SECRET: '"0787ef22aa1a4e08bfc5975a1b2714c8"',
  U_CENTER_BASE_URL: '"http://uat-ucenter.tairancloud.com/gateway/foundation-user"'
})
