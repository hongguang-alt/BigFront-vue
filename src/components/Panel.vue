<template>
  <div class="fly-panel fly-column">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link class="layui-hide-xs" tag="li" to="/home"
          ><a>首页</a></router-link
        >
        <router-link
          tag="li"
          :to="item.path"
          v-for="(item, index) in menuList"
          :key="'item' + index"
        >
          <a
            >{{ item.name
            }}<span v-if="item.isNew" class="layui-badge-dot"></span
          ></a>
        </router-link>
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
          <span class="fly-mid"></span>
        </li>

        <!-- 用户登入后显示 -->
        <template v-if="isLogin">
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <a href="">我发表的贴</a>
          </li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
            <a href="">我收藏的贴</a>
          </li>
        </template>
      </ul>

      <div class="fly-column-right layui-hide-xs">
        <span class="fly-search"><i class="layui-icon"></i></span>
        <a href="" class="layui-btn">发表新帖</a>
      </div>
      <div
        class="layui-hide-sm layui-show-xs-block"
        style="margin-top: -10px; padding-bottom: 10px; text-align: center"
      >
        <a href="" class="layui-btn">发表新帖</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "panel",
  data() {
    return {
      menuList: [
        {
          name: "提问",
          isNew: false,
          path: "/home/ask",
        },
        {
          name: "分享",
          isNew: true,
          path: "/home/share",
        },
        {
          name: "讨论",
          isNew: false,
          path: "/home/discuss",
        },
        {
          name: "建议",
          isNew: false,
          path: "/home/advise",
        },
        {
          name: "公告",
          isNew: false,
          path: "/home/notice",
        },
        {
          name: "动态",
          isNew: false,
          path: "/home/logs",
        },
      ],
      isLogin: this.$store.state.isLogin,
    };
  },
};
</script>

<style>
</style>