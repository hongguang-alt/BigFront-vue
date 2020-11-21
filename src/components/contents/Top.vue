<template>
  <div class="fly-panel" v-if="lists.length > 0">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a
        href="#signin"
        class="layui-hide-sm layui-show-xs-block fly-right"
        id="LAY_goSignin"
        style="color: #ff5722"
        >去签到</a
      >
    </div>
    <list-item :lists="lists" :isShow="false"></list-item>
  </div>
</template>

<script>
import { getList } from "../../axios/content";
import ListItem from "./ListItem";
export default {
  name: "top",
  data() {
    return {
      type: "1",
      lists: [],
      page: 0,
      limit: 20,
    };
  },
  mounted() {
    this._getList();
  },
  methods: {
    //只获取一次
    async _getList() {
      let options = {
        type: this.type,
        page: this.page,
        limit: this.limit,
      };
      try {
        let res = await getList(options);
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
  components: {
    ListItem,
  },
};
</script>

<style>
</style>