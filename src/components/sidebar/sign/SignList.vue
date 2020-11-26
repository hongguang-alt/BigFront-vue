<template>
  <div v-show="showSignActive" class="sign-des">
    <div class="mask" @click="closeSignActive"></div>
    <div class="content">
      <div class="sign-title">
        <span class="gray">签到活跃榜-TOP</span>
        <i
          class="layui-icon layui-icon-close"
          @click="closeSignActive"
          style="float:right;"
        ></i>
      </div>
      <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
        <ul class="layui-tab-title">
          <li :class="current === 0 ? 'layui-this' : ''" @click="setCurrent(0)">
            最新签到
          </li>
          <li :class="current === 1 ? 'layui-this' : ''" @click="setCurrent(1)">
            今日最快
          </li>
          <li :class="current === 2 ? 'layui-this' : ''" @click="setCurrent(2)">
            总签到榜
          </li>
        </ul>
        <div class="layui-tab-content">
          <ul>
            <li
              v-for="(item, index) in lists"
              :key="'item' + index"
              class="sign-list"
            >
              <img
                src="https://s1.ax1x.com/2020/04/26/J6LW5Q.jpg"
                alt=""
                width="35px"
              />
              <cite style="padding:0 5px;">{{ item.name }}</cite>

              <span v-if="current === 2"
                >已经连续签到<cite>{{ item.count }}</cite
                >天</span
              >
              <span v-else>
                2021-10-1
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sign-list",
  props: {
    showSignActive: {
      type: Boolean,
    },
  },
  data() {
    return {
      current: 0,
      lists: [
        {
          name: "hongguang",
          count: 2,
        },
        {
          name: "hongguang",
          count: 2,
        },
        {
          name: "hongguang",
          count: 2,
        },
        {
          name: "hongguang",
          count: 2,
        },
        {
          name: "hongguang",
          count: 2,
        },
      ],
    };
  },
  methods: {
    setCurrent(value) {
      this.current = value;
    },
    closeSignActive() {
      this.$emit("signActiveClose");
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
