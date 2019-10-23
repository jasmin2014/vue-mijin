// 财务管理
import http from '../lib/http'

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
// 还款明细查询下载
export const downRepayDetailList = (params) => {
  return http.admin.get(`v1/export/ppvt-repay-record`, {
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
//还款明细查询
export const getRepayDetailList = (params) => {
  return http.admin.get(`v1/repay/order/records/page`, {
    params
  })
};

/** ================ 资金流水 暂用用户资金流水接口 ================ **/
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
// export const downFundList = (params) => {
//   return http.admin.get(`v1/export/_account-flow`, {
//     params: params,
//     responseType: "blob"
//   })
// };

// 资金账户信息下载
export const downDestList = (params) => {
  return http.admin.get(`v1/export/_depository-account-flow`, {
    params: params,
    responseType: "blob"
  })
};
// 律信账户信息下载
export const downLxList = (params) => {
  return http.admin.get(`v1/export/_lawcert-account-flow`, {
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
};

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

// 手动还款记录
export const getArtificialList = (loanApplication) => {
  return http.admin.get(`v1/ppvt/artificial/list/${loanApplication}`)
};

// 获取账户可用余额
export const queryAccount = (loanApplication) => {
  return http.admin.get(`v1/ppvt/artificial/_query-account/${loanApplication}`)
};

// 还款金额
export const calculateAccount = (params) => {
  return http.admin.post('v1/ppvt/artificial/_calculate-account', params)
};

// 添加记录
export const addRecord = (params) => {
  return http.admin.post('v1/ppvt/artificial/_add', params)
};

// 线下还款全部列表
export const allOfflineList = (params) => {
  return http.admin.get(`v1/fundflow/offline-repayment-register/all/page`, {
    params: params
  })
};

// 线下还款全部列表
export const dealOfflineList = (params) => {
  return http.admin.get(`v1/fundflow/offline-repayment-register/doing/page`, {
    params: params
  })
};

// 线下还款批量调账制单
// 批量通过接口
export const batchOfflineAdjust = (params) => {
  return http.admin.post(`v1/fundflow/reconcile-account-application/application/offline-repayment/patch`, params)
};

// 贷款管理信息下载
export const downLoadOfflineList = (params) => {
  return http.admin.get(`v1/export/offline-repayment`, {
    params: params,
    responseType: "blob"
  })
};


/** ================ 调账管理 ================ **/
//逾期减免确认列表 -- 全部
export const getOverdueAllList = (params) => {
  return http.admin.get(`v1/fundflow/overdue-remit/all/page`, {params})
};
//逾期减免确认列表 -- 代办
export const getOverdueDealList = (params) => {
  return http.admin.get(`v1/fundflow/overdue-remit/doing/page`, {params})
};
// 逾期减免确认 --不通过
export const overdueFail = (remitId, refuseReason) => {
  return http.admin.put(`v1/fundflow/overdue-remit/confirm-fail?remitId=${remitId}&refuseReason=${refuseReason}`)
};
// 逾期减免确认 --通过
export const overduePass = (remitId) => {
  return http.admin.put(`v1/fundflow/overdue-remit/confirm-pass?remitId=${remitId}`)
};
//逾期减免调账申请
export const overdueApply = (remitId, memo) => {
  return http.admin.post(`v1/fundflow/reconcile-account-application/application/overdue-remit?remitId=${remitId}&memo=${memo}`)
};
//逾期减免批量调账申请
export const overdueBatchApply = (params) => {
  return http.admin.post(`v1/fundflow/reconcile-account-application/application/overdue-remit/patch`, params)
};

/** ================ 贷款管理 ================ **/
//账户余额管理列表
export const getAccountBlcList = (params) => {
  return http.admin.post(`v1/account/balance/page`, params)
};
//通过手机号码查询账户余额管理列表
export const getAccountBlc = (mobile) => {
  return http.admin.get(`v1/account/balance/mobile/${mobile}`)
};
//解冻-冻结账户余额
export const putAccountBlc = (params) => {
  return http.admin.put(`v1/account/balance`,params)
};
//余额更新
export const putRefBalance = (params) => {
  return http.admin.put(`v1/account/balance/refresh`,params)
};
