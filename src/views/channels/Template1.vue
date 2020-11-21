<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <list />
      </div>
      <div class="layui-col-md4">
        <tip />
        <hot-list />
        <ads />
        <links />
      </div>
    </div>
  </div>
</template>

<script>
import Ads from "../../components/sidebar/Ads";
import HotList from "../../components/sidebar/HotList";
import Links from "../../components/sidebar/Links";
import Tip from "../../components/sidebar/Tip";
import List from "../../components/contents/List";
export default {
  name: "template1",
  components: {
    Ads,
    HotList,
    Links,
    Tip,
    List,
  },
};
</script>

<style>
</style>