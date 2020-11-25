<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief">
      <ul class="layui-tab-title">
        <router-link :to="{ name: 'post-release' }" tag="li"
          >我发的帖</router-link
        >
        <router-link :to="{ name: 'post-collect' }" tag="li"
          >我收藏的贴</router-link
        >
      </ul>
      <div class="layui-tab-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-posts",
};
</script>

<style></style>
