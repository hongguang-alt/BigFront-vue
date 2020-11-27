<template>
  <div class="not-found">
    <div>
      <i
        class="layui-icon layui-icon-404"
        style="font-size: 200px; color: rgba(0,0,0,.7);"
      ></i>
    </div>
    <router-link tag="button" to="/home" type="button" class="layui-btn">
      返回首页
    </router-link>
  </div>
</template>

<script>
export default {
  name: "notFound",
};
</script>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
}
</style>
