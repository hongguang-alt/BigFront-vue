<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ValidationObserver ref="updatePasswordForm" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(update)">
        <div class="layui-form-item">
          <label for="L_nowpass" class="layui-form-label">当前密码</label>
          <ValidationProvider v-slot="v" rules="required|minmax:6,16">
            <div class="layui-input-inline">
              <input
                type="password"
                name="oldpassword"
                autocomplete="off"
                class="layui-input"
                v-model="oldpassword"
              />
            </div>
            <div class="layui-form-mid err-msg">
              {{ v.errors[0] }}
            </div>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <label for="L_pass" class="layui-form-label">新密码</label>
          <ValidationProvider
            v-slot="v"
            rules="required|minmax:6,16"
            vid="password"
          >
            <div class="layui-input-inline">
              <input
                name="password"
                type="password"
                autocomplete="off"
                class="layui-input"
                v-model="password"
              />
            </div>
            <div class="layui-form-mid err-msg" v-if="v.errors[0]">
              {{ v.errors[0] }}
            </div>
            <div class="layui-form-mid layui-word-aux">6到16个字符</div>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <label for="L_repass" class="layui-form-label">确认密码</label>
          <ValidationProvider
            v-slot="v"
            rules="required|minmax:6,16|confirmed:password"
          >
            <div class="layui-input-inline">
              <input
                type="password"
                name="checkpassword"
                class="layui-input"
                v-model="checkpassword"
              />
            </div>
            <div class="layui-form-mid err-msg">
              {{ v.errors[0] }}
            </div>
          </ValidationProvider>
        </div>
        <div class="layui-form-item">
          <button class="layui-btn" key="set-mine" lay-filter="*" lay-submit>
            确认修改
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { updatePassword } from "../../../axios/user";
export default {
  name: "set-password",
  data() {
    return {
      password: "",
      oldpassword: "",
      checkpassword: "",
    };
  },
  methods: {
    async update() {
      try {
        let res = await updatePassword({
          oldpassword: this.oldpassword,
          password: this.password,
        });
        if (res.status == 200) {
          this.$alert({
            AType: "success",
            message: "修改密码成功",
          });
        } else {
          this.$alert({
            AType: "danger",
            message: res.msg,
          });
        }
        this.password = "";
        this.oldpassword = "";
        this.checkpassword = "";
        this.$refs.updatePasswordForm.reset();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
