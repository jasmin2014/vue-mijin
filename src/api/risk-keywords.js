import http from "../lib/http";

/**===========关键字-个人基本情况 联系人信息 家庭基本情况(授信)==========**/
export const getKeyWordsPersonalInfo = (flowType,applicationId) => {
  return http.admin.get(`/v1/crux/fileds/personal/${flowType}/${applicationId}`);
};

/**===========关键字-个人基本情况 联系人信息 家庭基本情况(借款)==========**/
export const keyWordsPersonalInfoLoan = applicationId => {
  return http.admin.get(`/v1/crux/fileds/personal/loan/${applicationId}`);
};

/**===========电商信息 授信(电商通 / 企业通 / 跨境通)================**/
export const getKeyWordsBusinessInfo = (flowType,applicationId) => {
  return http.admin.get(`/v1/crux/fileds/commerce/${flowType}/${applicationId}`);
};

/**==========关键字-征信报告数据获取(授信/授信)=================**/
export const getKeyWordsCreditReport = (flowType,applicationId) => {
  return http.admin.get(
    `/v1/crux/fileds/investigation/${flowType}/${applicationId}`
  );
};

/**===========关键字-保存授信/借款 个人基本情况 联系人信息 家庭基本情况-=================**/
export const keyWordsSavePersonal = params => {
  return http.admin.post("/v1/crux/fileds/_personal", params);
};

/**===========关键字-保存授信/借款 电商信息 (电商通/企业通/跨境通)==============**/
export const keWordsSaveBusinessInfo = params => {
  return http.admin.post("/v1/crux/fileds/_commerce", params);
};

/**=========关键字-保存授信/借款 征信信息===============**/
export const keyWordsSaveInvestigation = params => {
  return http.admin.post("/v1/crux/fileds/_investigation", params);
};


/**==========关键字-借款-烟草信息=================**/
export const getKeyWordsYCTInfo = (flowType,applicationId) => {
  return http.admin.get(`/v1/crux/fileds/commerce/yct/${flowType}/${applicationId}`);
};

/**=========关键字-授信-烟草信息===============**/
export const saveKeyWordsYCTInfo = params => {
  return http.admin.post("/v1/crux/fileds/yct/_commerce", params);
};

