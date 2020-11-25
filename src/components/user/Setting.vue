<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title" id="LAY_mine">
        <router-link :to="{ name: 'set-form' }" tag="li">我的资料</router-link>
        <router-link :to="{ name: 'set-avater' }" tag="li">头像</router-link>
        <router-link :to="{ name: 'set-pas' }" tag="li">密码</router-link>
        <router-link :to="{ name: 'set-account' }" tag="li"
          >账号绑定</router-link
        >
      </ul>
      <div class="layui-tab-content" style="padding: 20px 0;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-setting",
};
</script>

<style></style>
