import http from "../lib/http";

/** ================ banner列表 ================ **/
export const getBannerList = (params) => {
  return http.admin.get('v1/h5/banner/page',{params});
};
/** ================ banner--新增 ================ **/
export const addBanner = (params) => {
  return http.admin.post(`v1/h5/banner/add`, params)
};
/** ================ banner--详情 ================ **/
export const getBannerDetail = (bannerId) => {
  return http.admin.get(`v1/h5/banner/${bannerId}`);
};
/** ================ banner--删除 ================ **/
export const delBanner = (bannerId) => {
  return http.admin.delete(`v1/h5/banner/del/${bannerId}`);
};
/** ================ banner--修改 ================ **/
export const editBanner = (params) => {
  return http.admin.post(`v1/h5/banner/update`, params)
};




