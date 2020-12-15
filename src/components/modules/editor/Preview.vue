<template>
  <transition name="fade">
    <div
      class="layui-layer-page layui-layer-prompt edit-content"
      v-show="isShow"
      id="preview"
    >
      <div class="layui-layer-title">预览</div>
      <div class="layui-layer-content" v-html="content"></div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a
          class="layui-layer-ico layui-layer-close layui-layer-close1"
          href="javascript:;"
        ></a>
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["isShow", "content"],
  name: "preview",
  methods: {
    cancel() {
      this.$emit("closeEvent");
    },
  },
};
</script>

<style scoped>
#preview {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10001;
}
</style>
