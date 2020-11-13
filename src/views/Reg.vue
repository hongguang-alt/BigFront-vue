<template>
  <div>
    <div class="layui-tab layui-tab-brief containter">
      <ul class="layui-tab-title">
        <li>
          <router-link to="/login">登入</router-link>
        </li>
        <li class="layui-this">
          <router-link to="/reg">注册</router-link>
        </li>
      </ul>
      <div class="layui-tab-content">
        <form class="layui-form layui-form-pane" action="">
          <div class="layui-form-item">
            <label class="layui-form-label">邮箱</label>
            <ValidationProvider v-slot="v" rules="required|email">
              <div class="layui-input-inline">
                <input
                  name="username"
                  placeholder="请输入用户名"
                  autocomplete="off"
                  class="layui-input"
                  v-model="username"
                />
              </div>
              <div class="layui-form-mid err-msg" v-if="v.errors[0]">
                {{ v.errors[0] }}
              </div>
              <div class="layui-form-mid layui-word-aux" v-else>
                将成为您唯一的登陆名
              </div>
            </ValidationProvider>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">昵称</label>
            <ValidationProvider v-slot="v" rules="required">
              <div class="layui-input-inline">
                <input
                  name="nickname"
                  placeholder="请输入昵称"
                  autocomplete="off"
                  class="layui-input"
                  v-model="nickname"
                />
              </div>
              <div class="layui-form-mid err-msg">
                {{ v.errors[0] }}
              </div>
            </ValidationProvider>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">密码</label>
            <ValidationProvider
              v-slot="v"
              rules="required|minmax:6,16"
              vid="password"
            >
              <div class="layui-input-inline">
                <input
                  name="password"
                  type="password"
                  placeholder="请输入密码"
                  autocomplete="off"
                  class="layui-input"
                  v-model="password"
                />
              </div>
              <div class="layui-form-mid err-msg" v-if="v.errors[0]">
                {{ v.errors[0] }}
              </div>
              <div class="layui-form-mid layui-word-aux" v-else>6-16个字符</div>
            </ValidationProvider>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">确认密码</label>
            <ValidationProvider
              v-slot="v"
              rules="required|minmax:6,16|confirmed:password"
            >
              <div class="layui-input-inline">
                <input
                  name="checkpassword"
                  type="password"
                  placeholder="请输入昵称"
                  autocomplete="off"
                  class="layui-input"
                  v-model="checkpassword"
                />
              </div>
              <div class="layui-form-mid err-msg">
                {{ v.errors[0] }}
              </div>
            </ValidationProvider>
          </div>
          <ValidationProvider v-slot="v" rules="required|length:4">
            <div class="layui-form-item">
              <label class="layui-form-label">验证码</label>
              <div class="layui-input-inline">
                <input
                  name="code"
                  placeholder="请输入验证码"
                  autocomplete="off"
                  class="layui-input"
                  v-model="code"
                />
              </div>
              <div
                class="layui-form-mid code"
                @click="changeSvg"
                v-html="svg"
              ></div>
            </div>
            <div class="err-msg-code err-msg">{{ v.errors[0] }}</div>
          </ValidationProvider>
          <button type="button" class="layui-btn laydate-footer-btns btn">
            立即注册
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { getSvgLogin } from "../axios/login";
export default {
  name: "reg",
  mounted() {
    this.getSvg();
  },
  data() {
    return {
      username: "",
      nickname: "",
      password: "",
      checkpassword: "",
      code: "",
      svg: "",
    };
  },
  methods: {
    //获取验证码的图片
    async getSvg() {
      try {
        let res = await getSvgLogin();
        if (res.status == 200) {
          this.svg = res.data;
        } else {
          console.log(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
    //点击获取验证码
    changeSvg() {
      this.getSvg();
    },
  },
};
</script>

<style scoped>
.containter {
  padding: 10px 20px 20px;
  background-color: white;
  margin: 30px;
}
a:hover {
  color: #009688;
}
.code {
  margin-top: -20px;
}
</style>