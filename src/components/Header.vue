<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
        <!-- <img src="" alt="layui" width="100px" /> -->
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <router-link to="/home"
            ><i class="iconfont icon-jiaoliu"></i>交流</router-link
          >
        </li>
        <li class="layui-nav-item">
          <a href="case/case.html"
            ><i class="iconfont icon-iconmingxinganli"></i>案例</a
          >
        </li>
        <li class="layui-nav-item">
          <a href="/" target="_blank"><i class="iconfont icon-ui"></i>框架</a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <a
              class="iconfont icon-touxiang layui-hide-xs"
              href="user/login.html"
            ></a>
          </li>
          <li class="layui-nav-item">
            <router-link to="/login">登入</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link to="/reg">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href="/app/qq/"
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              href="/app/weibo/"
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li>
        </template>

        <!-- 登入后的状态 -->
        <li
          class="layui-nav-item"
          v-else
          @mouseenter="showItem"
          @mouseleave="destroyItem"
        >
          <a class="fly-nav-avatar" href="javascript:;">
            <cite class="layui-hide-xs">{{ userInfo.nickname }}</cite>
            <!-- <i
              class="iconfont icon-renzheng layui-hide-xs"
              title="认证信息：layui 作者"
            ></i> -->
            <i
              class="layui-badge fly-badge-vip layui-hide-xs"
              v-if="userInfo.isVip > 0"
              >{{ "vip" + userInfo.isVip }}</i
            >
            <img :src="userInfo.pic" />
          </a>
          <dl
            class="layui-nav-child layui-anim layui-anim-upbit"
            :class="showChild ? 'layui-show' : ''"
          >
            <dd>
              <router-link to="/center/setting"
                ><i class="layui-icon">&#xe620;</i>基本设置</router-link
              >
            </dd>
            <dd>
              <router-link to="/center/msg"
                ><i class="iconfont icon-tongzhi" style="top: 4px;"></i
                >我的消息</router-link
              >
            </dd>
            <dd>
              <router-link to="/mypage"
                ><i
                  class="layui-icon"
                  style="margin-left: 2px; font-size: 22px;"
                  >&#xe68e;</i
                >我的主页</router-link
              >
            </dd>
            <hr style="margin: 5px 0;" />
            <dd @click="logout">
              <router-link to="/login" style="text-align: center;"
                >退出</router-link
              >
            </dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showChild: false,
      timer: {},
    };
  },
  methods: {
    showItem() {
      //过渡时期的设置this.showChild被定时器清除，压根就没有执行了，实现了联动，牛逼
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.showChild = true;
      }, 200);
    },
    destroyItem() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.showChild = false;
      }, 200);
    },
    logout() {
      //清除记录
      localStorage.clear();
      this.$store.commit("setToken", "");
      this.$store.commit("setUserInfo", "");
      this.$store.commit("setLogin", false);
    },
  },
  computed: {
    isShow() {
      return this.$store.state.isLogin;
    },
    userInfo() {
      return (
        this.$store.state.userInfo || {
          nickname: "",
          isVip: 0,
          pic: "",
        }
      );
    },
  },
};
</script>

<style lang="less" scoped></style>
