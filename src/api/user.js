import http from "../lib/http";

/** ================ 用户 ================ **/
export const getLoginUser = () => {
  return http.admin.get('v1/user/info')
};
export const logout = () => {
  return http.admin.post('v1/user/_logout')
};


/** ================ 用户管理 ================ **/
//用户列表
export const getUserList = (params) => {
  return http.admin.get('v1/party/person/list/page',{params});
};
//用户基本详情
export const getBasicDetail = (partyId) => {
  return http.admin.get(`v1/party/person/detail/${partyId}`);
};
/** ================ 风控白名单 ================ **/
//白名单列表
export const getWhiteList = (params) => {
  return http.admin.get('/v1/party/whitelist',{params});
};
//从白名单列表删除
export const deleteWhiteList = (_id) => {
  return http.admin.delete(`/v1/party/whitelist/${_id}`)
};
//根据手机号获取白名单
export const lookUpWhiteList = (params) => {
  return http.admin.get(`/v1/party/whitelist/_mobile/${mobile}`, params)
};
//添加白名单
export const addWhiteList = (params) => {
  return http.admin.post(`/v1/party/whitelist`, params)
};
/** ================ 授信申请 ================ **/
//授信申请记录
export const creditList = (params) => {
  return http.admin.get(`v1/asset/credit-application/list`,{params});
};

/** ================ 担保记录 ================ **/
//担保记录
export const guaranteeDetail = (creditId) => {
  return http.admin.get(`v1/asset/guarantee-audit/_guarantee_detail/${creditId}`);
};

/** ================ 借贷记录 ================ **/
//借贷记录
export const loanList = (params) => {
  return http.admin.get(`v1/asset/loan-application/list`,{params});
};

/** ================ 资金流水 ================ **/
//资金账户列表
export const getFundList = (params) => {
  return http.admin.get('v1/account/flow/_find-page-for-fund-center-front',{params})
};

//存管账户列表
export const getDepositList = (params) => {
  return http.admin.get('v1/account/flow/_find-page-for-depository',{params})
};

//城市
export const getRegion = (region) => {
  return http.common.get('v1/region', {
    params: region
  })
};