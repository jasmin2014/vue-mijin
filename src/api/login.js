import axios from 'axios';

const http = axios.create({
  baseURL: '/api/admin/',
  timeout: 30000
});
// const appId = "uc83be9ad9293507e5"; //用户中心appId
// const appSecret = "0787ef22aa1a4e08bfc5975a1b2714c8"; //用户中心appSecret
// const uCenterBaseURL = "http://uat-ucenter.tairancloud.com/gateway/foundation-user";

const appId = APP_ID; //用户中心appId
const appSecret = APP_SECRET; //用户中心appSecret
const uCenterBaseURL = U_CENTER_BASE_URL;
const uCenterTenantURL = U_CENTER_TENANT_URL;
const pubKeyAppId = "ucenter";  //获取公钥的appId

// 验证用户
export const checkPhone = (token) => {
  return http.get(`v1/user/status`,{
    headers: {
      Authorization: token
    }
  })
};

/** =====================登录================== **/
// 登录(手机号 密码)
export const doLogin = (phone, password) => {
  return http.post(`${uCenterBaseURL}/login/phone`, {
    appId,
    appSecret,
    password,
    phone
  })
};
// 登录(手机号 密码 短信验证码)
export const phoneCodeLogin = (phone, password,phoneCode) => {
  return http.post(`${uCenterBaseURL}/login/phone_pwd_code`, {
    appId,
    appSecret,
    password,
    phone,
    phoneCode,
    encryptFlag: true
  })
};
/** =====================激活/重置================== **/
// 发送激活/重置手机验证码
export const sendCode = (usage, phone) => {
  return http.post(`${uCenterBaseURL}/mock/send_code`, {
    appId,
    appSecret,
    usage,
    phone
  })
};

// 激活
export const doActivate = (phone, phoneCode, password) => {
  return http.post(`${uCenterBaseURL}/register/phone`, {
    appId,
    appSecret,
    password,
    phone,
    phoneCode,
    encryptFlag: true
  })
};

// 重置密码
export const doResetPassword = (phone, phoneCode, newPassword) => {
  return http.put(`${uCenterBaseURL}/password/reset`, {
    appId,
    appSecret,
    phone,
    phoneCode,
    newPassword,
    encryptFlag: true
  })
};
//获取加密的公钥
export const getLoginPublicKey = () => {
  return http.get(`${uCenterTenantURL}/app/app_id_${pubKeyAppId}/pub_key`)
};


