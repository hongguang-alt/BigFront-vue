<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <ValidationObserver ref="loginForm" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(edit)">
        <div class="layui-form-item">
          <label for="L_email" class="layui-form-label">邮箱</label>
          <ValidationProvider
            v-slot="v"
            vid="username"
            rules="required|email|checkUsername"
          >
            <div class="layui-input-inline">
              <input
                type="text"
                name="username"
                autocomplete="off"
                class="layui-input"
                v-model="username"
              />
            </div>
            <div class="layui-form-mid err-msg">
              {{ v.errors[0] }}
            </div>
          </ValidationProvider>
          <!-- <div class="layui-form-mid layui-word-aux">
            如果您在邮箱已激活的情况下，变更了邮箱，需<a
              href="activate.html"
              style="font-size: 12px; color: #4f99cf;"
              >重新验证邮箱</a
            >。
          </div> -->
        </div>
        <div class="layui-form-item">
          <label for="L_username" class="layui-form-label">昵称</label>
          <ValidationProvider
            v-slot="v"
            vid="nickname"
            rules="required|checkNickname"
          >
            <div class="layui-input-inline">
              <input
                type="text"
                name="nickname"
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
          <label class="layui-form-label">性别</label>
          <div class="layui-input-block radio-flex">
            <label for="gender1">
              <input
                type="radio"
                id="gender1"
                name="gender"
                value="0"
                v-model="gender"
              />
              <i
                class=" layui-icon layui-icon-circle"
                :class="{ 'layui-icon-radio': gender === '0' }"
              ></i>
              男
            </label>
            <label for="gender2">
              <input
                type="radio"
                id="gender2"
                name="gender"
                value="1"
                v-model="gender"
              />
              <i
                class="layui-icon layui-icon-circle"
                :class="{ 'layui-icon-radio': gender === '1' }"
              ></i>
              女
            </label>
          </div>
        </div>
        <div class="layui-form-item">
          <label for="L_city" class="layui-form-label">城市</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="city"
              autocomplete="off"
              class="layui-input"
              v-model="location"
            />
          </div>
        </div>
        <div class="layui-form-item layui-form-text">
          <label for="L_sign" class="layui-form-label">签名</label>
          <div class="layui-input-block">
            <textarea
              placeholder="随便写些什么刷下存在感"
              id="L_sign"
              name="sign"
              autocomplete="off"
              class="layui-textarea"
              style="height: 80px;"
              v-model="regmark"
            ></textarea>
          </div>
        </div>
        <div class="layui-form-item">
          <button class="layui-btn" type="submit">
            确认修改
          </button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { getNickname, getUsername } from "../../../axios/public";
import { getEdit } from "../../../axios/user";
import store from "../../../store";
extend("checkUsername", {
  validate: async function(value) {
    //判断是不是则身
    let username = store.state.userInfo.username;
    if (username === value) return true;
    let { data, status } = await getUsername({ username: value });
    if (status === 200 && typeof data == "boolean") {
      return !data;
    }
  },
  message: "用户名已经被占用了",
});

extend("checkNickname", {
  validate: async function(value) {
    let nickname = store.state.userInfo.nickname;
    if (nickname === value) return true;
    let { data, status } = await getNickname({ nickname: value });
    if (status === 200 && typeof data == "boolean") {
      return !data;
    }
  },
  message: "昵称已经被占用了",
});
export default {
  name: "set-form",
  data() {
    return {
      gender: "0",
      username: "",
      nickname: "",
      location: "",
      regmark: "",
    };
  },
  mounted() {
    window.vue = this;
    this.getInit();
  },
  methods: {
    getInit() {
      let userInfo = this.$store.state.userInfo;
      const { location, regmark, nickname, username, gender } = userInfo;
      this.location = location;
      this.regmark = regmark;
      this.nickname = nickname;
      this.username = username;
      this.gender = gender;
    },
    async edit() {
      try {
        let res = await getEdit({
          gender: this.gender,
          username: this.username,
          nickname: this.nickname,
          location: this.location,
          regmark: this.regmark,
        });
        if (res.status === 200) {
          this.$alert({
            AType: "success",
            message: "修改成功",
          });
          this.$store.commit("setUserInfo", {
            ...this.$store.state.userInfo,
            gender: this.gender,
            username: this.username,
            nickname: this.nickname,
            location: this.location,
            regmark: this.regmark,
          });
        } else if (res.status == 202) {
          this.$confirm({
            message: "邮箱不一致，请前往邮箱内重置",
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.layui-icon-circle {
  color: #009688;
}
.radio-flex {
  display: flex;
  align-items: center;
  .layui-icon-circle {
    margin-left: 5px;
  }
}
</style>
