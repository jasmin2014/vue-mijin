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
//还款明细
export const repayList = (repayId) => {
  return http.admin.get(`v1/repay/order/records?repayId=${repayId}`);
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
//律信账户列表
export const getLxList = (params) => {
  return http.admin.get('v1/account/flow/_find-page-for-lawcert',{params})
};

//城市
export const getRegion = (region) => {
  return http.common.get('v1/region', {
    params: region
  })
};


/** ================  客服管理 ================ **/
//用户列表
export const getCustomerList = (params) => {
  return http.admin.get('v1/party/person/mobile',{params});
};
/** ================  线下还款确认 ================ **/
//查询当前用户的未到账列表
export const getUnrepaymentList = (params) => {
  return http.admin.get('v1/fundflow/offline-repayment-register/list',{params});
};
//线下还款登记
export const offlineRepayRegister = (params) => {
  return http.admin.post(`v1/fundflow/offline-repayment-register`, params)
};
//查询用户当天相同金额的还款登记数量
export const getSameRegisterTime = (params) => {
  return http.admin.get('v1/fundflow/offline-repayment-register/same',{params});
};
// 确认到账
export const confirmFail = (params) => {
  return http.admin.put(`v1/fundflow/offline-repayment-register/confirm-fail?registerId=${params.registerId}`)
};
// 确认未到账
export const confirmPass = (params) => {
  return http.admin.put(`v1/fundflow/offline-repayment-register/confirm-pass?registerId=${params.registerId}&repaymentTime=${params.repaymentTime}`)
};

//线下还款调账制单
export const offlineAdjustApply = (params) => {
  return http.admin.post(`v1/fundflow/reconcile-account-application/application/offline-repayment?registerId=${params.registerId}&memo=${params.memo}`)
};
