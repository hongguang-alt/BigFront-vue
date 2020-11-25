<template>
  <div id="app">
    <my-header />
    <router-view></router-view>
    <my-footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    "my-header": Header,
    "my-footer": Footer,
  },
};
</script>

<style lang="less" scoped></style>
