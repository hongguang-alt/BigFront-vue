<template>
  <div>
    <panel></panel>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">listItem</div>
        <div class="layui-col-md4">
          <ads />
          <hot-list />
          <links />
          <sign />
          <tips />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Panel from "../components/Panel.vue";
import Ads from "../components/sidebar/Ads";
import HotList from "../components/sidebar/HotList";
import Links from "../components/sidebar/Links";
import Sign from "../components/sidebar/Sign";
export default {
  name: "home",
  components: {
    Panel,
    Ads,
    HotList,
    Links,
    Sign,
  },
};
</script>

<style>
</style>