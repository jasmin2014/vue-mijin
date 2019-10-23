module.exports = {
  "process.env": {
    NODE_ENV: '"production"'
  },
  // 正式环境
  APP_ID: '"uc8bb59ccb61098275"', // 用户中心appId
  APP_SECRET: '"dc8a515af7a2425abcfd99aca33f30bb"', // 用户中心appSecret
  U_CENTER_BASE_URL: '"https://ucenter.trc.com/gateway/foundation-user"',
  U_CENTER_TENANT_URL:'"https://ucenter.trc.com/gateway/foundation-tenant"',
  DCP_URL: '"collect.trc.com"'
  // DCP_DOMAIN: JSON.stringify(process.env.DCP_DOMAIN)
};
