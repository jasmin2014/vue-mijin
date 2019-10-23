import http from "../../lib/http";

/**===========经营信息-烟草通-企业列表接口(授信)==========**/
export const getYCTCreditEnterpriseList = applicationId => {
  return http.admin.get(
    `/v1/audit/operating/tobacco/companys/credit/${applicationId}`
  );
};

/**===========经营信息-烟草通-企业列表接口(借款)==========**/
export const getYCTLoanEnterpriseList = applicationId => {
  return http.admin.get(
    `/v1/audit/operating/tobacco/companys/loan/${applicationId}`
  );
};

/**===========经营信息-烟草通-企业列表保存接口==========**/
export const addYCTCompanys = (nodeName, params) => {
  return http.admin.post(
    `/v1/audit/operating/tobacco/list/_company?nodeName=${nodeName}`,
    params
  );
};
/**===========经营信息-烟草通-企业列表删除接口==========**/
export const delYCTCompanys = (_id) => {
  return http.admin.delete(
    `/v1/audit/operating/tobacco/_company?_id=${_id}`);
};
/**===========经营信息-烟草通-企业后台列表数据删除接口==========**/
export const delYCTMonthlyData = (_id,monthId) => {
  return http.admin.delete(
    `/v1/audit/operating/tobacco/_stock_data?_id=${_id}&monthId=${monthId}`);
};
/**===========经营信息-烟草通-企业基本信息获取接口(授信)==========**/
export const getYCTManageBaseEnterprise = (flowType,applicationId) => {
  return http.admin.get(
    `/v1/audit/operating/tobacco/detail/${flowType}/${applicationId}`
  );
};

// /**===========经营信息-烟草通-企业基本信息获取接口(借款)==========**/
// export const getYCTLoanEnterpriseInfo = applicationId => {
//   return http.admin.get(
//     `/v1/audit/operating/tobacco/detail/loan/${applicationId}`
//   );
// };

/**===========经营信息-烟草通-企业基本信息保存接口(借款)==========**/
export const saveYCTEnterpriseInfo = (nodeName,params) => {
  return http.admin.post(`/v1/audit/operating/tobacco/base/_company?nodeName=${nodeName}`, params);
};
