import {
  extend,
  localize
} from "vee-validate";
//国际化
import zh from 'vee-validate/dist/locale/zh_CN.json'

import {
  required,
  email,
  min,
  length,
  confirmed
} from "vee-validate/dist/rules";

localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: "请输入{_field_}"
  },
  names: {
    username: '用户名',
    password: '密码',
    email: "邮箱",
    code: '验证码',
    nickname: "昵称",
    checkpassword: '确认密码',
    oldpassword: '旧密码'
  },
  fields: {
    username: {
      email: '{_field_}格式错误'
    },
    password: {
      length: '{_field_}长度不正确',
      minmax: '{_field_} 必须在长度为{min}到{max}字符之间',
      min: "{_field_}至少有{length}长度",
    },
    checkpassword: {
      confirmed: '{_field_}不同',
      minmax: '{_field_} 必须在长度为{min}到{max}字符之间'
    },
    oldpassword: {
      minmax: '{_field_} 必须在长度为{min}到{max}字符之间'
    }
  }
});


//配置请求规则
extend("email", email);
extend("min", min);
extend("length", length);
extend("required", required);
extend('confirmed', confirmed);

//自定义规则
extend('minmax', {
  validate(value, {
    min,
    max
  }) {
    return value.length >= min && value.length <= max;
  },
  params: ['min', 'max'],
  // message: "{_field_} 必须在长度为{min}到{max}字符之间"
});