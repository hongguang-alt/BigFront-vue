<template>
  <dl class="fly-panel fly-list-one">
    <dt class="fly-panel-title">本周热议</dt>
    <div v-if="lists && lists.length > 0">
      <dd v-for="(item, index) in lists" :key="'item' + index">
        <a href="jie/detail.html">{{ item.title }}</a>
        <span><i class="iconfont icon-pinglun1"></i> {{ item.count }}</span>
      </dd>
    </div>
    <!-- 无数据时 -->
    <div class="fly-none" v-else>没有相关数据</div>
  </dl>
</template>

<script>
import { getHot } from "../../axios/content";
export default {
  name: "hotlist",
  mounted() {
    this._getHot();
  },
  data() {
    return {
      lists: [],
    };
  },
  methods: {
    async _getHot() {
      try {
        let res = await getHot();
        if (res.status === 200) {
          this.lists = res.data;
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
</style>