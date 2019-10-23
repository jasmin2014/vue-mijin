import http from "../lib/http";

/* --------------- 催收管理 --------------- */
export const getCollectionList = (params) => {
  return http.admin.get('v1/ppvt/collction/list/page', {params});
};

/* --------------- 催收推送报错 --------------- */
//列表
export const getCollectionPushList = (params) => {
  return http.admin.get('/v1/post-loan', {params});
};
//重试
export const retryPush = (id) => {
  return http.admin.post(`v1/post-loan/${id}`);
}
