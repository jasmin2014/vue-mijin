"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
  "process.env": {
    NODE_ENV: '"development"'
  },
  APP_ID: '"uc02c2207d8758675d"',
  APP_SECRET: '"e4970d3fa6c54ba194c195ac58189bcf"',
  U_CENTER_BASE_URL: '"https://ucenter.fengdai.org/gateway/foundation-user"',
  U_CENTER_TENANT_URL: '"https://ucenter.fengdai.org/gateway/foundation-tenant"',
  DCP_URL: '"testcollect.fengdai.org"'
});
