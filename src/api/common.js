import http from '../lib/http'

/**===========获取七牛云的token============**/
export const getQiniuToken = () => {
  return http.common.get('v1/qiniu/upToken');
};

/**===========获取七牛云的图片地址==========**/
export const getPicUrls = (uris) => {
  return http.common.post('v1/qiniu/urls',uris)
}
