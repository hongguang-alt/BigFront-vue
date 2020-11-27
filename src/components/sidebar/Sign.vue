<template>
  <div class="fly-panel fly-signin">
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinHelp"
        @click="openSignDes"
        >说明</a
      >
      <i class="fly-mid"></i>
      <a
        href="javascript:;"
        class="fly-link"
        id="LAY_signinTop"
        @click="openSignActive"
        >活跃榜<span class="layui-badge-dot"></span
      ></a>
      <span class="fly-signin-days"
        >已连续签到<cite>{{ isLogin ? userInfo.count : 0 }}</cite
        >天</span
      >
    </div>
    <div class="fly-panel-main fly-signin-main">
      <template v-if="!isSign"
        ><button
          class="layui-btn layui-btn-danger"
          id="LAY_signin"
          @click="getSign"
        >
          今日签到
        </button>
        <span
          >可获得<cite>{{ fav }}</cite
          >飞吻</span
        ></template
      >

      <!-- 已签到状态 -->
      <template v-else>
        <button class="layui-btn layui-btn-disabled">今日已签到</button>
        <span
          >获得了<cite>{{ fav }}</cite
          >飞吻</span
        >
      </template>
    </div>
    <sign-info
      :showSignDes="showSignDes"
      @signDesClose="closeSignDes"
    ></sign-info>
    <sign-list
      :showSignActive="showSignActive"
      @signActiveClose="closeSignActive"
    ></sign-list>
  </div>
</template>
<script>
import SignInfo from "./sign/SignInfo";
import SignList from "./sign/SignList";
import { sign } from "../../axios/user";
export default {
  name: "sign",
  components: {
    SignInfo,
    SignList,
  },
  data() {
    return {
      showSignDes: false,
      showSignActive: false,
      userInfo: this.$store.state.userInfo,
      isLogin: this.$store.state.isLogin,
    };
  },
  computed: {
    fav() {
      //排除未登录的状态
      if (!this.isLogin) {
        return 5;
      }
      //今日可获得的积分
      const count = this.userInfo.count + 1;
      let fav = 0;
      if (count < 5) {
        fav = 5;
      } else if (count >= 5) {
        fav = 10;
      } else if (5 < count <= 15) {
        fav = 15;
      } else if (15 < count <= 30) {
        fav = 20;
      } else if (30 < count <= 100) {
        fav = 30;
      } else if (100 < count <= 365) {
        fav = 50;
      }
      return fav;
    },
    isSign() {
      return this.$store.state.userInfo.isSign;
    },
  },
  methods: {
    closeSignDes() {
      this.showSignDes = false;
    },
    openSignDes() {
      this.showSignDes = true;
    },
    closeSignActive() {
      this.showSignActive = false;
    },
    openSignActive() {
      this.showSignActive = true;
    },
    setCurrent(value) {
      this.current = value;
    },
    //去签到
    async getSign() {
      if (!this.isLogin) {
        return this.$confirm({
          message: "请先登录",
          onOk: () => {
            this.$router.push("/login");
          },
          onCancel: () => {},
        });
      }
      let res = await sign();
      let user = this.$store.state.userInfo;
      if (res.status === 200) {
        //手动的修改参数，感觉很不好，应该用接口去调用，这样的话，可能会出现问题，数据不同步
        user.favs = res.data.favs;
        user.count = res.data.count;
        user.isSign = true;
        this.$store.commit("setUserInfo", user);
      } else {
        this.$alert("签到失败");
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>
