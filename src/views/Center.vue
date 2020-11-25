<template>
  <div class="fly-marginTop layui-container fly-user-main ">
    <ul class="layui-nav layui-nav-tree" lay-filter="test">
      <!-- 侧边导航: <ul class="layui-nav layui-nav-tree layui-nav-side"> -->
      <li
        class="layui-nav-item"
        v-for="(item, index) in lists"
        :key="'item' + index"
      >
        <router-link
          :to="{ name: item.linkName }"
          :active-class="item.activeClass"
        >
          <i class="layui-icon" :class="item.icon"></i>
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "center",
  data() {
    return {
      lists: [
        {
          name: "我的主页",
          icon: "layui-icon-username",
          linkName: "mypage",
        },
        {
          name: "用户中心",
          icon: "layui-icon-home",
          linkName: "user-center",
        },
        {
          name: "基本设置",
          icon: "layui-icon-set-fill",
          // linkName: "user-setting",
          linkName: "set-form",
          activeClass: "layui-this",
        },
        {
          name: "我的帖子",
          icon: "layui-icon-list",
          // linkName: "user-posts",
          activeClass: "layui-this",
          linkName: "post-release",
        },
        {
          name: "我的消息",
          icon: "layui-icon-reply-fill",
          linkName: "user-msg",
        },
        {
          name: "其他设置",
          icon: "layui-icon-form",
          linkName: "user-other",
        },
      ],
    };
  },
};
</script>

<style></style>
