// 财务管理
import http from '../lib/http'
import {
  personCreditPass
} from './risk';

/** ================ 财务审核 ================ **/
// 财务放款列表
export const getFinanceLoanList = (params) => {
  return http.admin.get('v1/payment', {
    params
  })
};
// 放款详情
export const getFinanceDetail = (paymentId) => {
  return http.admin.get(`v1/payment/${paymentId}`)
};
// 确定放款
export const surePayment = (terminationDTO) => {
  return http.admin.post('v1/payment', terminationDTO)
}
// 终止放款
export const cancelPayment = (terminationDTO) => {
  return http.admin.post('v1/payment/_terminate', terminationDTO)
}

/** ================ 数据列表导出 ================ **/
// 放款信息下载
export const downPaymentList = (params) => {
  return http.admin.get(`v1/export/payment`, {
    params: params,
    responseType: "blob"
  })
};
// 已还款信息信息下载
export const downRepayedList = (params) => {
  return http.admin.get(`v1/export/repayed`, {
    params: params,
    responseType: "blob"
  })
};
// 未还款信息下载
export const downUnRepayList = (params) => {
  return http.admin.get(`v1/export/unrepay`, {
    params: params,
    responseType: "blob"
  })
};
// 贷款管理信息下载
export const downLoanManageList = (params) => {
  return http.admin.get(`v1/export/loan-management/export`, {
    params: params,
    responseType: "blob"
  })
};

/** ================ 贷款管理 ================ **/
//列表
export const getLoanList = (params) => {
  return http.admin.get('v1/loan', {
    params
  })
};
//详情
export const getLoanDetail = (applicationId) => {
  return http.admin.get(`v1/loan/${applicationId}`)
};

/** ================ 还款管理 ================ **/
//已还款信息列表
export const getRepayList = (params) => {
  return http.admin.get('v1/repay/order/_find-repayed-order-page', {
    params
  })
};
//待还款信息列表
export const getWaitRepayList = (params) => {
  return http.admin.get(`v1/repay/order/_find-un-repay-order-page`, {
    params
  })
};

/** ================ 资金流水 ================ **/
//资金账户列表
export const getFundList = (params) => {
  return http.admin.get('v1/account/flow/_find-page-for-fund-center', {
    params
  })
};
//存管账户列表
export const getDepositList = (params) => {
  return http.admin.get('v1/account/flow/_find-page-for-depository', {
    params
  })
};

// 资金账户信息下载
export const downFundList = (params) => {
  return http.admin.get(`v1/export/_account-flow`, {
    params: params,
    responseType: "blob"
  })
};

// 资金账户信息下载
export const downDestList = (params) => {
  return http.admin.get(`v1/export/_depository-account-flow`, {
    params: params,
    responseType: "blob"
  })
};


/** ================ 调账管理 ================ **/
// 调账管理（全部）列表
export const allAdjustment = (params) => {
  return http.admin.get(`v1/fundflow/reconcile-account-application/all/page`, {
    params: params
  })
};

// 调账管理（待办）列表
export const dealAdjustment = (params) => {
  return http.admin.get(`v1/fundflow/reconcile-account-application/doing/page`, {
    params: params
  })
};

// 提交申请(平台调账)
export const personWithPerson = (params) => {
  return http.admin.post('v1/fundflow/reconcile-account-application/person-with-person', params)
}

// 提交申请(平台划账)
export const orgWithPerson = (params) => {
  return http.admin.post('v1/fundflow/reconcile-account-application/org-with-person', params)
}

// 提交调账申请
export const adjustApply = (params) => {
  return http.admin.post('v1/fundflow/reconcile-account-application/application', params)
}

// 调账信息下载
export const downAdjustList = (params) => {
  return http.admin.get(`v1/fundflow/reconcile-account-application/download-reconcile-list-excel`, {
    params: params,
    responseType: "blob"
  })
};

// 调账模版下载
export const downAdjustmemo = (params) => {
  return http.admin.get(`v1/fundflow/reconcile-account-application/download-reconcile-template-excel`, {
    params: params,
    responseType: "blob"
  })
};

// 调账详情
export const adjustDetail = (id) => {
  return http.admin.get(`v1/fundflow/reconcile-account-application/get-party-info?applicationId=${id}`)
};

// 调用资金中心接口
export const callFundCenter = (id) => {
  return http.admin.put(`v1/fundflow/reconcile-account-application/_call-fund-center?applicationId=${id}`)
};

// 调账审核通过接口
export const adjustPass = (params) => {
  return http.admin.put(`v1/fundflow/reconcile-account-application/_approved`, params)
};

// 调账审核不通过接口
export const adjustFail = (params) => {
  return http.admin.put(`v1/fundflow/reconcile-account-application/_refused`, params)
};

// 批量通过接口
export const batchPass = (params) => {
  return http.admin.put(`v1/fundflow/reconcile-account-application/_batch-approved`, params)
};

// 批量不通过接口
export const batchFail = (params) => {
  return http.admin.put(`v1/fundflow/reconcile-account-application/_batch-refused`, params)
};

// 上传批量excel
export const uploadExcel = (params, headers) => {
  return http.admin.post('v1/fundflow/reconcile-account-application/upload-reconcile-excel', params, headers)
}

// 查询用户姓名
export const queryName = (mobile) => {
  return http.admin.get(`v1/fundflow/reconcile-account-application/get-person-name?mobile=${mobile}`)
};

