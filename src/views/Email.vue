<template>
  <div class="layui-card">
    <div class="title">确定重置你的邮箱为{{ username }}？</div>
    <div>
      <button
        type="button"
        class="layui-btn"
        @click="submit()"
        :class="{ 'layui-btn-disabled': !isClick }"
      >
        确定
      </button>
      <router-link
        tag="button"
        to="/home"
        type="button"
        class="layui-btn layui-btn-primary"
      >
        返回首页
      </router-link>
    </div>
  </div>
</template>

<script>
import { updateUsername } from "../axios/user";
import { getHashUrl } from "../utils";
export default {
  name: "email",
  mounted() {
    let res = getHashUrl(window.location.hash);
    this.username = decodeURIComponent(res.username);
    this.key = decodeURIComponent(res.key);
  },
  data() {
    return {
      username: "",
      isClick: true,
    };
  },
  methods: {
    async submit() {
      this.isClick = false;
      try {
        let res = await updateUsername({
          key: this.key,
          username: this.username,
        });
        if (res.status === 200) {
          this.$confirm({
            message: "修改成功",
            onOk: () => {},
          });
          setTimeout(() => {
            this.$router.push("/home");
          }, 100);
        } else {
          this.$alert({
            message: "修改失败",
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scode lang="scss">
.layui-card {
  margin: 20px 50px;
  text-align: center;
  padding: 10px;
  .title {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }
}
</style>
