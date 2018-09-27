var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  'process.env': {
    NODE_ENV: '"testing"'
  },
  APP_ID: '"uc83be9ad9293507e5"', // 用户中心appId
  APP_SECRET: '"0787ef22aa1a4e08bfc5975a1b2714c8"', // 用户中心appSecret
  U_CENTER_BASE_URL: '"http://uat-ucenter.tairancloud.com/gateway/foundation-user"'
});
