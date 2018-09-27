import http from '../lib/http'

//所有枚举
export const getAllSysEnum = () => {
  return http.common.get('v1/enums/sys/all')
};
//系统下拉框
export const getSysEnum = (kind, group, enumKey, visible, binarySequence) => {
  return http.common.get('v1/enums/sys/list', {
    params: {
      kind,
      group,
      enumKey,
      visible,
      binarySequence
    }
  })
};

//城市
export const getRegionEnum = (parentRegion) => {
  return http.common.get('v1/region', {
    params: {
      parentRegion
    }
  })
};
