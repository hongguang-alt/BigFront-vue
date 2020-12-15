<template>
  <transition name="fade">
    <div
      class="layui-layer-page layui-layer-prompt edit-content"
      v-show="isShow"
    >
      <div class="layui-layer-title">请输入引用内容</div>
      <div class="layui-layer-content">
        <textarea
          class="layui-layer-input"
          id="quoteInput"
          v-model="quote"
          style="width: 300px; height: 100px;"
        ></textarea>
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a class="layui-layer-ico layui-layer-close layui-layer-close1"></a>
      </span>
      <div class="layui-layer-btn">
        <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
        <a class="layui-layer-btn" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["isShow"],
  data() {
    return {
      quote: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("closeEvent");
      this.quote = "";
    },
    submit() {
      if (this.quote === "") {
        this.$pop({ message: "请输入引用内容", type: "shake" });
        return;
      }
      this.$emit("addEvent", this.quote);
      this.cancel();
    },
  },
};
</script>

<style></style>
