export function base_rule(name) {
  return [
    {
      required: true,
      message: "请输入" + name,
      trigger: "blur"
    }
  ];
}
export function pattern_rule(name, pattern, msg) {
  return [
    { required: true, message: "请输入" + name, trigger: "blur" },
    {
      pattern: pattern ? pattern : /^.{2,500}$/,
      message: msg ? msg : "请输入2~500个字以内",
      trigger: "blur"
    }
  ];
}

export function unquir_pattern_rule(pattern, msg) {
  return [
    {
      pattern: pattern ? pattern : /^.{2,500}$/,
      message: msg ? msg : "请输入2~500个字以内",
      trigger: "blur"
    }
  ];
}

export function validator_rule(validator) {
  return [{ validator: validator, trigger: "blur" }];
}

export function validator_requir_rule(validator, name) {
  return [
    {
      required: true,
      message: "请输入" + name,
      trigger: "blur"
    },
    { validator: validator, trigger: "blur" }
  ];
}

export function provice_rule(name) {
  return [
    {
      required: true,
      message: "请选择" + name + "省份",
      trigger: "change"
    }
  ];
}

export function city_rule(name) {
  return [
    {
      required: true,
      message: "请选择" + name + "城市",
      trigger: "change"
    }
  ];
}

export function change_required_rule(name) {
  return [
    {
      required: true,
      message: "请选择" + name,
      trigger: "change"
    }
  ];
}
