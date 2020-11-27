<template>
  <div>
    <div class="layui-tab layui-tab-brief containter">
      <ul class="layui-tab-title">
        <li>
          <router-link to="/login">登入</router-link>
        </li>
        <li class="layui-this">
          <router-link to="/findp">修改密码</router-link>
        </li>
      </ul>
      <div class="layui-tab-content">
        <form class="layui-form layui-form-pane" action="">
          <div class="layui-form-item">
            <label class="layui-form-label">邮箱</label>
            <ValidationProvider
              ref="findPForm"
              v-slot="v"
              rules="required|email|checkUsername"
            >
              <div class="layui-input-inline">
                <input
                  name="email"
                  placeholder="请输入邮箱"
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
          <button
            type="button"
            class="layui-btn laydate-footer-btns btn"
            @click="tosend"
          >
            提交
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { getSvgLogin, getForget } from "../axios/login";
import { getUsername } from "../axios/public";

extend("checkUsername", {
  validate: async function(value) {
    let { data, status } = await getUsername({ username: value });
    if (status === 200 && typeof data == "boolean") {
      return data;
    }
  },
  message: "用户名不存在",
});
export default {
  name: "findp",
  mounted() {
    this.getSvg();
  },
  data() {
    return {
      username: "",
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
    //点击发送邮件
    async tosend() {
      try {
        let res = await getForget({
          username: this.username,
          code: this.code,
        });
        if (res.status == 200) {
          this.$confirm({
            message: "邮箱已发送，请前往邮箱重置",
            onOk: () => {},
            onCancel: () => {},
          });
          this.username = "";
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

<style>
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
