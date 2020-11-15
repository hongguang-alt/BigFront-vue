<template>
  <div>
    <div class="layui-tab layui-tab-brief containter">
      <ul class="layui-tab-title">
        <li class="layui-this">
          <router-link to="/login">登入</router-link>
        </li>
        <li>
          <router-link to="/reg">注册</router-link>
        </li>
      </ul>
      <div class="layui-tab-content">
        <ValidationObserver ref="loginForm" v-slot="{ handleSubmit }">
          <form
            @submit.prevent="handleSubmit(login)"
            class="layui-form layui-form-pane"
            action=""
          >
            <div class="layui-form-item">
              <label class="layui-form-label">用户名</label>
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
                <div class="layui-form-mid err-msg">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <div class="layui-form-item">
              <label class="layui-form-label">密码</label>
              <ValidationProvider v-slot="v" rules="required|min:6">
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
                <div class="layui-form-mid err-msg">
                  {{ v.errors[0] }}
                </div>
              </ValidationProvider>
            </div>
            <ValidationProvider v-slot="v" vid="code" rules="required|length:4">
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
              立即登录
            </button>
            <router-link to="/findp">忘记密码?</router-link>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <!-- <Confirm message="this is a message" :isShow="true"></Confirm> -->
  </div>
</template>

<script>
import { getSvgLogin, getLogin } from "../axios/login";
import { v4 as uuidv4 } from "uuid";
// import Confirm from "../components/modules/confirm/Confirm.vue";
export default {
  name: "login",
  components: {
    // Confirm,
  },
  mounted() {
    window.vue = this;
    this.setUid();
    this.getSvg();
  },
  data() {
    return {
      username: "",
      password: "",
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
    //设置uuid
    setUid() {
      let sid = "";
      let uuid = localStorage.getItem("uuid");
      if (uuid) {
        sid = uuid;
      } else {
        sid = uuidv4();
        localStorage.setItem("uuid", sid);
      }
      this.$store.commit("setCodeUuid", uuid);
    },
    async login() {
      try {
        let res = await getLogin({
          username: this.username,
          password: this.password,
          code: this.code,
          sid: this.$store.state.codeUuid,
        });
        if (res.status === 200) {
          this.$refs.loginForm.reset();
          this.username = "";
          this.password = "";
          this.$router.push("/home");
          this.$alert({
            AType: "success",
            message: "登陆成功",
          });
        } else {
          this.$refs.loginForm.setErrors({
            code: [res.msg],
          });
          console.log("登陆失败");
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
.btn {
  margin-right: 20px;
}
.code {
  margin-top: -20px;
}
</style>