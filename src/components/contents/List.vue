<template>
  <div class="fly-panel" style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a
        :class="{ 'layui-this': status === '' && tag === '' }"
        @click.prevent="search()"
        >综合</a
      >
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '0' }" @click.prevent="search(0)"
        >未结</a
      >
      <span class="fly-mid"></span>
      <a :class="{ 'layui-this': status === '1' }" @click.prevent="search(1)"
        >已结</a
      >
      <span class="fly-mid"></span>
      <a
        :class="{ 'layui-this': status === '' && tag === '精华' }"
        @click.prevent="search(2)"
        >精华</a
      >
      <span class="fly-filter-right layui-hide-xs">
        <a
          :class="{ 'layui-this': sort === 'created' }"
          @click.prevent="search(3)"
          >按最新</a
        >
        <span class="fly-mid"></span>
        <a
          :class="{ 'layui-this': sort === 'answer' }"
          @click.prevent="search(4)"
          >按热议</a
        >
      </span>
    </div>
    <list-item :lists="lists" @nextPage="nextPage" :isEnd="isEnd"></list-item>
  </div>
</template>

<script>
import { getList } from "../../axios/content";
import ListItem from "./ListItem";
export default {
  name: "list",
  components: {
    ListItem,
  },
  mounted() {
    let catalog = this.$route.params.catalog;
    if (typeof catalog !== "undefined") {
      this.catalog = catalog;
    }
    //初始化数据
    this._getList();
  },
  watch: {
    current() {
      this.init();
    },
    $route() {
      let catalog = this.$route.params.catalog;
      console.log(catalog);
      if (typeof catalog !== "undefined") {
        this.catalog = catalog;
      }
      this.init();
    },
  },
  data() {
    return {
      type: '0',
      isRepeat: false,
      isEnd: false,
      //是否完结
      status: "",
      tag: "",
      sort: "created",
      current: "",
      page: 0,
      limit: 20,
      catalog: "",
      lists: [
        {
          uid: {
            name: "红光",
            isVip: "1",
          },
          title: "大前端课程",
          content: "这是大前端课程",
          catalog: "ask",
          created: "2020-11-19 20:00:00",
          fav: 40,
          isEnd: 0,
          reads: 10,
          answer: 0,
          isTop: 0,
          tags: [
            {
              name: "精华",
              class: "layui-bg-red",
            },
            {
              name: "热门",
              class: "layui-bg-blue",
            },
          ],
        },
      ],
    };
  },
  methods: {
    //初始化
    init() {
      this.page = 0;
      this.lists = [];
      //是否显示加载更多
      this.isEnd = false;
      this._getList();
    },
    //获取列表
    async _getList() {
      if (this.isRepeat) return;
      this.isRepeat = true;
      if (this.isEnd) return;
      try {
        let res = await getList({
          status: this.status,
          tag: this.tag,
          sort: this.sort,
          page: this.page,
          limit: this.limit,
          catalog: this.catalog,
          type: this.type,
        });
        if (res.status === 200) {
          this.isRepeat = false;
          if (this.lists.length === 0) {
            this.lists = res.data;
          } else {
            if (res.data.length < this.limit) {
              this.isEnd = true;
            }
            this.lists = this.lists.concat(res.data);
          }
        } else {
          this.isRepeat = false;
          console.log(res.msg);
        }
      } catch (e) {
        this.isRepeat = false;
        console.log("获取列表出错");
      }
    },
    search(val) {
      //防止每次点击都要去调用这个函数
      if (typeof val === "undefined" && this.current === "") {
        return;
      }
      this.current = val;
      switch (val) {
        // 未结贴
        case 0:
          this.status = "0";
          this.tag = "";
          break;
        // 已结贴
        case 1:
          this.status = "1";
          this.tag = "";
          break;
        // 查询"精华"标签
        case 2:
          this.status = "";
          this.tag = "精华";
          break;
        // 按照时间去查询
        case 3:
          this.sort = "created";
          break;
        // 按照评论数去查询
        case 4:
          this.sort = "answer";
          break;
        // 综合查询
        default:
          this.status = "";
          this.tag = "";
          this.current = "";
      }
    },
    //获取更多数据
    nextPage() {
      this.page++;
      this._getList();
    },
  },
};
</script>

<style lang='scss' scoped>
</style>