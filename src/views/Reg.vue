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
        <ValidationObserver ref="regForm" v-slot="{ handleSubmit }">
          <form
            class="layui-form layui-form-pane"
            action=""
            @submit.prevent="handleSubmit(register)"
          >
            <div class="layui-form-item">
              <label class="layui-form-label">用户名</label>
              <ValidationProvider
                v-slot="v"
                vid="username"
                rules="required|email|checkUsername"
              >
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
              <ValidationProvider
                v-slot="v"
                vid="nickname"
                rules="required|checkNickname"
              >
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
                <div class="layui-form-mid layui-word-aux" v-else>
                  6-16个字符
                </div>
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
            <button type="submit" class="layui-btn laydate-footer-btns btn">
              立即注册
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { getSvgLogin, getRegister } from "../axios/login";
import { getNickname, getUsername } from "../axios/public";

extend("checkUsername", {
  validate: async function (value) {
    let { data, status } = await getUsername({ username: value });
    if (status === 200 && typeof data == "boolean") {
      return !data;
    }
  },
  message: "用户名已经被占用了",
});

extend("checkNickname", {
  validate: async function (value) {
    let { data, status } = await getNickname({ nickname: value });
    if (status === 200 && typeof data == "boolean") {
      return !data;
    }
  },
  message: "昵称已经被占用了",
});
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
      let uuid = this.$store.state.codeUuid;
      try {
        let res = await getSvgLogin({ uuid });
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
    //注册方法
    async register() {
      try {
        let res = await getRegister({
          username: this.username,
          password: this.password,
          nickname: this.nickname,
          sid: this.$store.state.codeUuid,
          code: this.code,
        });
        if (res.status === 200) {
          this.$router.push("/login");
          this.username = "";
          this.nickname = "";
          this.password = "";
          this.code = "";
          this.$refs.regForm.reset();
        } else {
          console.log(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
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