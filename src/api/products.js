// 产品管理
import http from '../lib/http';

/** ================ 产品 ================ **/
//产品列表
export const getProductList = (params) => {
  return http.admin.get('v1/product/all/page',{params})
};
//新增产品
export const createProduct = (params) => {
  return http.admin.post(`v1/product/add`,params)
}
//产品详情
export const getProductDetail = (productId) => {
  return http.admin.get(`v1/product/${productId}`)
}
//修改产品
export const editProduct = (params) => {
  return http.admin.put(`v1/product/update`,params)
}
//上架产品
export const onProduct = (productId) =>{
  return http.admin.put(`v1/product/on/${productId}`)
}
//下架产品
export const offProduct = (productId) =>{
  return http.admin.put(`v1/product/off/${productId}`)
}
//关联产品策略
export const productStrategy = () =>{
  return http.admin.get(`/v1/product/product-strategy/_enable-list`)
}
//获取放款规则信息
export const productRule = (productId) =>{
  return http.admin.get(`v1/product/_rule/${productId}`)
}
//修改产品放款规则
export const editProductRule = (params) => {
  return http.admin.put(`v1/product/_update_rule`,params)
}

/** ================ 产品策略 ================ **/
//产品策略列表
export const getStrategyList = (params) => {
  return http.admin.get('v1/product/product-strategy/all/page',{params})
};
//产品策略详情
export const getStrategyDetail = (strategyId) => {
  return http.admin.get(`v1/product/product-strategy/${strategyId}`)
};
//新增产品策略
export const addStrategy = (params) => {
  return http.admin.post('/v1/product/product-strategy/add',params)
};
//启用
export const enableStrategy = (strategyId) => {
  return http.admin.put(`v1/product/product-strategy/enable/${strategyId}`)
};
//禁用
export const disableStrategy = (strategyId) => {
  return http.admin.put(`v1/product/product-strategy/disable/${strategyId}`)
};
//新增产品策略
export const editStrategy = (params) => {
  return http.admin.put('v1/product/product-strategy/update',params)
};
//删除
export const delStrategy = (strategyId,repayTerms) => {
  return http.admin.delete(`/v1/product/product-strategy/_del/${strategyId}/${repayTerms}`)
};
