import {
  request_get
} from  '../lib/requests';

/**
 * [get_chainlist 获取待上链列表]
 * @param  {[type]} params      [需要传的参数]
 * @return {[type]}             [description]
 */
export const getChainlist = (params) => {
  const url = `v1/asset_chain`
  return request_get(url,{params})
};
