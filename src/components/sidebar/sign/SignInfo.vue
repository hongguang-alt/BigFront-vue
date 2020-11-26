<template>
  <div v-show="showSignDes" class="sign-des">
    <div class="mask" @click="closeSignDes"></div>
    <div class="content">
      <div class="sign-title">
        <span class="gray">签到说明</span>
        <i
          class="layui-icon layui-icon-close"
          @click="closeSignDes"
          style="float:right;"
        ></i>
      </div>
      <blockquote class="layui-elem-quote">
        签到课获得社区积分，规则如下：
      </blockquote>
      <table class="layui-table">
        <thead>
          <tr>
            <th>连续签到天数</th>
            <th>每天可获积分</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&lt;5</td>
            <td>5</td>
          </tr>
          <tr>
            <td>&ge;5</td>
            <td>10</td>
          </tr>
          <tr>
            <td>&ge;15</td>
            <td>15</td>
          </tr>
          <tr>
            <td>&ge;30</td>
            <td>20</td>
          </tr>
          <tr>
            <td>&ge;100</td>
            <td>30</td>
          </tr>
          <tr>
            <td>&ge;565</td>
            <td>50</td>
          </tr>
        </tbody>
      </table>
      <p class="gray">中间若有间隔，则连续天数重新计算</p>
      <p style="color:red">不可复用程序自动签到，否则积分清零</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "sign-info",
  props: {
    showSignDes: {
      type: Boolean,
    },
  },
  methods: {
    closeSignDes() {
      this.$emit("signDesClose");
    },
  },
};
</script>

<style scoped lang="scss">
.gray {
  color: rgba(0, 0, 0, 0.7);
}
//遮罩的css样式
.mask {
  position: fixed;
  z-index: 20000;
  background: rgba(0, 0, 0, 0.9);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
//内容的背景css样式
.content {
  position: fixed;
  z-index: 20001;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 300px;
  height: 420px;
  padding: 20px;
  background: white;
}
.sign-title {
  padding: 5px 0;
}
.sign-list {
  margin: 3px 0;
}
</style>
