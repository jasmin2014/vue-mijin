// 银行卡
const card = /^\d{8,28}$/;
// 身份证号
const ident = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
// 手机号码
const mobile = /^[1][2,3,4,5,6,7,8][0-9]{9}$/;
//11位手机号码(不做任何格式校验)
const mobile11 = /^[0-9]{11}$/;

// 组织机构代码
const orgNo = /^[A-Za-z0-9]{8}-\d$/;
// 公积金账号
const pfAccount = /^\d{9,20}$/;
// 邮编
const postCode = /^\d{6}$/;
// 注册号
const regNo = /^\d{15}$/;
// 电话号码
const telephone = /^0\d{2,3}-\d{7,8}(-\d{1,4})?$/;
// 手机或电话
const telOrMobile = new RegExp(`^(${telephone.toString().slice(2, -2)})|(${mobile.toString().slice(2, -2)})$`);
// 社会信用代码
const usciCode = /^[A-Za-z0-9]{18}$/;
// 网址
const webSite = /^(http|https|ftp):\/\/[\w\-]+(\.[\w\-]+)+([\w\-:.,@?^=&%!#/~\\+]*[\w\-@?^=&%!#/~\\+])$/;
/**
 * 校验浮点数精度
 * @param {Number} num
 * @param {Number} precise
 */
const floatValidator = function (num, precise) {
  if (typeof num !== 'number') return false;
  const splits = String(num).split('.');
  return !splits[1] || splits[1].length <= precise;
};

/**
 * 两数相加精准丢失
 * @param {Number} arg1
 * @param {Number} arg2
 */
const numberValidator = function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return ((arg1 * m + arg2 * m) / m).toFixed(2)
}

export default {
  card,
  ident,
  mobile,
  orgNo,
  pfAccount,
  postCode,
  regNo,
  telephone,
  telOrMobile,
  usciCode,
  webSite,
  floatValidator,
  mobile11,
  numberValidator
}
