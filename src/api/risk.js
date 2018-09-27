import http from '../lib/http'

/**===========获取报告地址==========**/
export const getReportApi = () => {
  return http.admin.get('/v1/decision/engine/report/domain')
}

/** ================ 工作流配置 ================ **/
//授信审核列表(授信审核节点)
export const getCreditList = () => {
  return http.admin.get('v1/workflow/config/credit')
};
//借款审核列表(借款审核节点)
export const getLoanList = () => {
  return http.admin.get('v1/workflow/config/loan')
};
//查看工作流详情
export const getWorkflowDetail = (nodeId, params) => {
  return http.admin.get(`v1/workflow/config/party/${nodeId}`, {params})
};
//添加审核人
export const addAuditor = (params) => {
  return http.admin.post(`v1/workflow/config`, params)
};
//删除审核人
export const deleteAuditor = (id) => {
  return http.admin.delete(`v1/workflow/config/${id}`)
};

//电核记录
export const getExamineList = (applicationId,type) => {
  return http.admin.get(`v1/mobile/examine/list/${applicationId}`, {
    params: {
      type
    }
  });
};
//电核详情
export const getExamineDetail = (_id) => {
  return http.admin.get(`v1/mobile/examine/detail/${_id}`);
};
//添加电核信息
export const addExamine = (params) => {
  return http.admin.post('v1/mobile/examine', params);
};

/** ================ 授信审核 ================ **/
//授信全部列表
export const getCreditAllList = (params) => {
  return http.admin.get('v1/asset/credit-application/all/page', {params});
};
//授信代办列表
export const getCreditAgencyList = (params) => {
  return http.admin.get('v1/asset/credit-application/doing/page', {params});
};
//授信已审核列表
export const getCreditAuditList = (params) => {
  return http.admin.get('v1/asset/credit-application/done/page', {params});
};
//签收(授信)
export const creditSign = (applicationId) => {
  return http.admin.put(`v1/asset/credit-application/_sign/${applicationId}`);
};
//审核记录
export const getCreditTrial = (applicationId) => {
  return http.admin.get(`v1/asset/credit-application/detail/${applicationId}`);
};
//查询授信申请信息
export const creditApplyDetail = (applicationId) => {
  return http.admin.get(`v1/asset/credit-application/_strategy/${applicationId}`);
};
//补充资料
export const creditSupplement = (applicationId, nodeId, description) => {
  return http.admin.put(`v1/asset/credit-application/_supplement`, null, {
    params: {
      applicationId,
      nodeId,
      description
    }
  });
};
//通过
export const creditPass = (params) => {
  return http.admin.put(`v1/asset/credit-application/_approved`, params);
};
//人工补资料的通过
export const personCreditPass = (params) => {
  return http.admin.put(`v1/asset/credit-application/_completion`, null, {params});
};
//不通过
export const creditNotPass = (params) => {
  return http.admin.put(`v1/asset/credit-application/_refused`, null, {
    params
  });
};

//获取授信信息--产品策略
export const getProductCheckBox = (productId) => {
  return http.admin.get(`v1/product/_get_strategy/${productId}`);
};

//详情-用户基本详情(授信)
export const getCreditBasicDetail = (applicationId) => {
  return http.admin.get(`v1/party/person/base/credit/${applicationId}`);
};
//详情-用户基本详情(借款)
export const getLoanBasicDetail = (applicationId) => {
  return http.admin.get(`v1/party/person/base/loan/${applicationId}`);
};

//个人信息(授信)
export const getCreditPersonDetail = (applicationId) => {
  return http.admin.get(`v1/audit/person/detail/credit/${applicationId}`);
};
//个人信息(借款)
export const getLoanPersonDetail = (applicationId) => {
  return http.admin.get(`v1/audit/person/detail/loan/${applicationId}`);
};
//增加个人信息
export const addPersonDetail = (params) => {
  return http.admin.post('v1/audit/person', params);
};
//删除网核
export const delPersonRel = (netId, _id) => {
  return http.admin.delete(`v1/audit/person`, {
    params: {
      netId,
      _id
    }
  });
};
/**
 * 经营信息
 * **/
//经营 -- 企业信息查询 (授信)
export const getCreditManageEnterprise = (applicationId) => {
  return http.admin.get(`v1/audit/operating/_enterprise/detail/credit/${applicationId}`);
};
//经营 -- 企业信息查询 (借款)
export const getLoanManageEnterprise = (applicationId) => {
  return http.admin.get(`v1/audit/operating/_enterprise/detail/loan/${applicationId}`);
};
//店铺信息(授信)
export const getCreditManageShops = (applicationId) => {
  return http.admin.get(`v1/audit/operating/_shop/detail/credit/${applicationId}`);
};
//店铺信息(借款)
export const getLoanManageShops = (applicationId) => {
  return http.admin.get(`v1/audit/operating/_shop/detail/loan/${applicationId}`);
};


//保存企业信息
export const addManageEnterprise = (params) => {
  return http.admin.post('v1/audit/operating/_enterprise', params);
};
//添加店铺信息
export const addManageShops = (params) => {
  return http.admin.post('v1/audit/operating/_shop', params);
};

//删除经营店铺信息
export const delManageShop = (_id) => {
  return http.admin.delete('v1/audit/operating/_shop', {
    params:{
      _id
    }});
};
//删除经营店铺单月数据
export const delManageMonthlyData = (monthId,_id) => {
  return http.admin.delete('v1/audit/operating/_shop/_shop-monthly-data', {
    params:{
      monthId,
      _id
    }});
};

/**
 * 资产信息
 * **/
//资产信息(授信)
export const getCreditAssetInfo = (applicationId) => {
  return http.admin.get(`v1/audit/asset/detail/credit/${applicationId}`);
};
//资产信息(借款)
export const getLoanAssetInfo = (applicationId) => {
  return http.admin.get(`v1/audit/asset/detail/loan/${applicationId}`);
};

//添加资产信息
export const addAssetDetail = (params) => {
  return http.admin.post('v1/audit/asset', params);
};
//删除资产
export const delAssetDetail = (personAssetId,_id) => {
  return http.admin.delete('v1/audit/asset', {
    params:{
      personAssetId,
      _id
    }});
};

/**
 * 信用情况
 * **/
//信用情况(授信)
export const getCreCreditDetail = (applicationId) => {
  return http.admin.get(`v1/asset/audit-for-credit/detail_credit/${applicationId}`);
};
//信用情况(借款)
export const getLoanCreditDetail = (applicationId) => {
  return http.admin.get(`v1/asset/audit-for-credit/detail_loan/${applicationId}`);
};
//添加信用情况
export const addCreditDetail = (params) => {
  return http.admin.post('v1/asset/audit-for-credit/_add', params);
};
// 删除货记卡
export const delCreditDebitCard = (code,applicationId) => {
  return http.admin.delete('v1/asset/audit-for-credit/debit_card', {
    params:{
      code,
      applicationId
    }});
};
// 删除贷款信息
export const delCreditLoanInfo = (code,applicationId) => {
  return http.admin.delete('v1/asset/audit-for-credit/loan_central_bank', {
    params:{
      code,
      applicationId
    }});
};
// 删除其他
export const delCreditOther = (code,applicationId) => {
  return http.admin.delete('v1/asset/audit-for-credit/loan_other', {
    params:{
      code,
      applicationId
    }});
};


/** ================ 担保人审核 ================ **/
//借款审核记录
export const getLoanTrial = (applicationId) => {
  return http.admin.get(`v1/asset/loan-application/detail/${applicationId}`);
};
//通过
export const loanPass = (params) => {
  return http.admin.put(`v1/asset/loan-application/_approved/`, null, {params});
};
//不通过
export const loanNotPass = (params) => {
  return http.admin.put(`v1/asset/loan-application/_refused/`, null, {
    params
  });
};
//借款申请信息
export const loanApplyDetail = (applicationId) => {
  return http.admin.get(`v1/asset/loan-application/${applicationId}`);
};


/** ================ 担保人审核 ================ **/
//列表
export const getGuaranteeList = (params) => {
  return http.admin.get('v1/asset/guarantee-audit/all/page', {params});
};
//担保人详情
export const guaranteeDetail = (applicationId) => {
  return http.admin.get(`v1/asset/guarantee-audit/${applicationId}`);
};
//担保人详情审批列表
export const guaranteeAuditList = (applicationId) => {
  return http.admin.get(`v1/asset/guarantee-application/detail/${applicationId}`);
};
//取消担保
export const cancelGuarantee = (applicationId, status) => {
  return http.admin.put(`v1/asset/guarantee-application/_cancel`, null, {
    params: {
      applicationId,
      status
    }
  });
};
//担保通过
export const guaranteePass = (applicationId, description, status) => {
    return http.admin.put(`v1/asset/guarantee-application/_approved`, null, {
        params: {
          applicationId,
          description,
          status
        }
      }
    );
  }
;
//担保不通过
export const guaranteeNotPass = (applicationId, description, status) => {
  return http.admin.put(`v1/asset/guarantee-application/_refused`, null, {
    params: {
      applicationId,
      description,
      status
    }
  });
};
//返回修改
export const backGuarantee = (applicationId, description, status) => {
  return http.admin.put(`v1/asset/guarantee-application/_supplement`, null, {
    params: {
      applicationId,
      description,
      status
    }
  });
};

/** ================ 借款审核 ================ **/
//借款全部列表
export const getLoanAllList = (params) => {
  return http.admin.get('v1/asset/loan-application/all/page', {params});
};
//借款代办列表
export const getLoanAgencyList = (params) => {
  return http.admin.get('v1/asset/loan-application/doing/page', {params});
};
//借款已审核列表
export const getLoanAuditList = (params) => {
  return http.admin.get('v1/asset/loan-application/done/page', {params});
};
//签收
export const loanSign = (applicationId) => {
  return http.admin.put(`v1/asset/loan-application/_sign/${applicationId}`);
};

/** ================ 用户额度管理 ================ **/
//列表
export const getQuotaList = (params) => {
  return http.admin.get('v1/asset/credit/list', {params});
};
//授信详情列表
export const getQuotaDetailList = (creditId) => {
  return http.admin.get(`v1/asset/credit/${creditId}/_change-list`);
};
//修改编辑详情
export const getQuotaDetail = (creditId) => {
  return http.admin.get(`v1/asset/credit?creditId=${creditId}`);
};
//修改授信额度
export const editQuota = (creditId, creditAmount, changeReason) => {
  return http.admin.put(`v1/asset/credit/_update/${creditId}`, null, {
    params: {
      creditAmount,
      changeReason
    }
  });
};
//结束额度
export const endQuota = (creditId, overReason) => {
  return http.admin.put(`v1/asset/credit/_over/${creditId}`, null, {
    params: {
      overReason
    }
  });
};
