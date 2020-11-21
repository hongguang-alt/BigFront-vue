<template>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <top />
        <list />
      </div>
      <div class="layui-col-md4">
        <tip />
        <sign />
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
import Sign from "../../components/sidebar/Sign";
import Tip from "../../components/sidebar/Tip";
import List from "../../components/contents/List";
import Top from "../../components/contents/Top";
export default {
  name: "index",
  components: {
    Top,
    Ads,
    HotList,
    Links,
    Sign,
    Tip,
    List,
  },
};
</script>

<style>
</style>