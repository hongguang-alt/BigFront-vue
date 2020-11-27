<template>
  <div>
    <div class="layui-tab layui-tab-brief containter">
      <ul class="layui-tab-title">
        <li>
          <router-link to="/login">登入</router-link>
        </li>
        <li>
          <router-link to="/reset">重置密码</router-link>
        </li>
      </ul>
      <div class="layui-tab-content">
        <ValidationObserver ref="loginForm" v-slot="{ handleSubmit }">
          <form
            @submit.prevent="handleSubmit(reset)"
            class="layui-form layui-form-pane"
            action=""
          >
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
            <button type="submit" class="layui-btn laydate-footer-btns btn">
              立即重置
            </button>
          </form>
        </ValidationObserver>
      </div>
    </div>
    <!-- <Confirm message="this is a message" :isShow="true"></Confirm> -->
  </div>
</template>

<script>
import { changePassword } from "../axios/user";
import { getHashUrl } from "../utils";
export default {
  name: "reset",
  data() {
    return {
      password: "",
    };
  },
  mounted() {
    let res = getHashUrl(window.location.hash);
    this.key = decodeURIComponent(res.key);
  },
  methods: {
    async reset() {
      try {
        let res = await changePassword({
          password: this.password,
          key: this.key,
        });
        if (res.status == 200) {
          this.$alert({
            AType: "success",
            message: "重置成功",
          });
          setTimeout(() => {
            this.$router.push("/login");
          }, 200);
        } else {
          this.$alert({
            AType: "danger",
            message: "重置失败",
          });
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
</style>
